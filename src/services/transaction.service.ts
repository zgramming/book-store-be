import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import InvariantError from '@utils/exceptions/invariant-error';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

import dayjs from 'dayjs';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  student_name?: string;
  date_loan?: Date;
  date_return?: Date;
}

interface TransactionBookDetailDTO {
  book_id: number;
  quantity: number;
}

interface TransactionCreateDTO {
  student_id: number;
  date_loan: Date;
  date_return: Date;
  items: TransactionBookDetailDTO[];
}

class TransactionService {
  async findAll({ limit, page, date_loan, date_return, student_name }: FindAllQueryParams) {
    const result = await prisma.transaction.findMany({
      take: limit,
      skip: (page - 1) * limit,
      include: {
        TransactionDetail: true,
        student: true,
      },
      where: {
        student: {
          name: {
            contains: student_name,
            mode: 'insensitive',
          },
        },
        date_loan: {
          gte: date_loan,
        },
        date_return: {
          lte: date_return,
        },
      },
    });

    const total = await prisma.transaction.count();

    return {
      data: result,
      total,
    };
  }

  async findDetail(transactionId: number) {
    const transactionDetail = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        TransactionDetail: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!transactionDetail) {
      throw new NotFoundError('Transaction not found');
    }

    return transactionDetail;
  }

  async create(data: TransactionCreateDTO) {
    const transaction = await prisma.$transaction(async (trx) => {
      const checkStudent = await trx.masterStudent.findFirst({
        where: {
          id: data.student_id,
        },
      });

      if (!checkStudent) {
        throw new NotFoundError('Student not found');
      }

      const isActived = checkStudent.status === 'active';

      if (!isActived) {
        throw new InvariantError('Student is not active');
      }

      const durationInDays = dayjs(data.date_return).diff(dayjs(data.date_loan), 'day');
      const isExceedTwoWeeks = durationInDays > 14;

      if (isExceedTwoWeeks) {
        throw new InvariantError(`Loan duration cannot exceed 14 days, current duration: ${durationInDays} days`);
      }

      // Validate if stock is enough
      const bookIds = data.items.map((book) => book.book_id);
      const booksInventory = await trx.inventory.findMany({
        where: {
          book_id: {
            in: bookIds,
          },
        },
        include: {
          book: true,
        },
      });

      for (const book of data.items) {
        const loanedBookAgg = await trx.transactionDetail.aggregate({
          _sum: {
            qty: true,
          },
          where: {
            book_id: book.book_id,
            status: 'loaned',
          },
        });
        const loanedBook = loanedBookAgg._sum?.qty || 0;

        const bookInventory = booksInventory.find((inventory) => inventory.book_id === book.book_id);

        if (!bookInventory) {
          throw new NotFoundError('Book not found in inventory');
        }

        const currentStock = bookInventory.stock - loanedBook;
        const isStockNotEnough = currentStock < +book.quantity;

        if (isStockNotEnough) {
          throw new InvariantError(
            `Stock of ${bookInventory.book.title} at location ${bookInventory.location} is not enough, current stock: ${currentStock}`,
          );
        }
      }

      const result = await prisma.transaction.create({
        data: {
          student_id: data.student_id,
          date_loan: data.date_loan,
          date_return: data.date_return,
          status: 'loaned',
          TransactionDetail: {
            createMany: {
              data: data.items.map((book) => ({
                book_id: book.book_id,
                qty: +book.quantity,
              })),
            },
          },
        },
      });

      return result;
    });

    return transaction;
  }

  async returnBook(transactionId: number) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        TransactionDetail: true,
      },
    });

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    const isReturned = transaction.status === 'returned';

    if (isReturned) {
      throw new InvariantError('Book has been returned');
    }

    // Update transaction status
    const result = await prisma.$transaction(async (trx) => {
      const updateTrx = await prisma.transaction.update({
        include: {
          TransactionDetail: true,
        },
        where: {
          id: transactionId,
        },
        data: {
          status: 'returned',
          TransactionDetail: {
            updateMany: {
              where: {
                transaction_id: transactionId,
              },
              data: {
                status: 'returned',
              },
            },
          },
        },
      });

      const detailTransaction = updateTrx.TransactionDetail;
      const bookIds = detailTransaction.map((detail) => detail.book_id);

      // After update transaction status, create history transaction
      for (const bookId of bookIds) {
        const totalBook = detailTransaction
          .filter((detail) => detail.book_id === bookId)
          .reduce((acc, curr) => acc + curr.qty, 0);
        const durationInDays = dayjs(updateTrx.date_return).diff(dayjs(updateTrx.date_loan), 'day');
        await trx.historyTransaction.create({
          data: {
            duration_loan_days: durationInDays,
            book_id: bookId,
            student_id: updateTrx.student_id,
            qty: totalBook,
            transaction_id: updateTrx.id,
          },
        });
      }

      return updateTrx;
    });

    return result;
  }
}

export default TransactionService;
