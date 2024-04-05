import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import { TransactionStatus } from '@prisma/client';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  nim?: string;
  name_student?: string;
  book_id?: number;
  book_title?: string;
  date_loan?: Date;
  date_return?: Date;
  long_loan_in_days?: number;
}

interface HistoryTransactionCreateDTO {
  transaction_id: number;
  book_id: number;
  student_id: number;
  qty: number;
  status: string;
  duration_loan_days: number;
}

class HistoryTransactionService {
  async findAll({
    limit,
    page,
    nim,
    name_student,
    book_id,
    book_title,
    date_loan,
    date_return,
    long_loan_in_days,
  }: FindAllQueryParams) {
    const result = await prisma.historyTransaction.findMany({
      where: {
        duration_loan_days: long_loan_in_days,
        student: {
          nim: {
            contains: nim,
            mode: 'insensitive',
          },
          name: {
            contains: name_student,
            mode: 'insensitive',
          },
        },
        book: {
          id: book_id,
          title: {
            contains: book_title,
            mode: 'insensitive',
          },
        },
        transaction: {
          date_loan: date_loan,
          date_return: date_return,
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.historyTransaction.count({
      where: {
        duration_loan_days: long_loan_in_days,
        student: {
          nim: {
            contains: nim,
            mode: 'insensitive',
          },
          name: {
            contains: name_student,
            mode: 'insensitive',
          },
        },
        book: {
          id: book_id,
          title: {
            contains: book_title,
            mode: 'insensitive',
          },
        },
        transaction: {
          date_loan: date_loan,
          date_return: date_return,
        },
      },
    });

    return {
      data: result,
      total,
    };
  }

  async create(data: HistoryTransactionCreateDTO) {
    const result = await prisma.historyTransaction.create({
      data: {
        transaction_id: data.transaction_id,
        book_id: data.book_id,
        student_id: data.student_id,
        qty: data.qty,
        status: data.status as TransactionStatus,
        duration_loan_days: data.duration_loan_days,
      },
    });

    return result;
  }
}

export default HistoryTransactionService;
