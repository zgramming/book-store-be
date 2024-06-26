import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import InvariantError from '@utils/exceptions/invariant-error';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  title?: string;
  location?: string;
}

interface InventoryCreateDTO {
  book_id: number;
  location: string;
  stock: number;
}

interface InventoryUpdateDTO {
  location?: string;
  book_id?: number;
}

class InventoryService {
  async findAll({ limit, page, title, location }: FindAllQueryParams) {
    const result = await prisma.inventory.findMany({
      where: {
        book: {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        },
        location: {
          contains: location,
          mode: 'insensitive',
        },
      },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
          },
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.inventory.count({
      where: {
        book: {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        },
        location: {
          contains: location,
          mode: 'insensitive',
        },
      },
    });

    let mapppedResult = [];

    for (const inventory of result) {
      const loanedStock = await prisma.transactionDetail.aggregate({
        _sum: {
          qty: true,
        },
        where: {
          book_id: inventory.book_id,
          status: 'loaned',
        },
      });

      const currentStock = inventory.stock - (loanedStock._sum.qty || 0);

      mapppedResult.push({
        ...inventory,
        current_stock: currentStock,
      });
    }

    return {
      data: mapppedResult,
      total,
    };
  }

  async findOne(id: number) {
    const result = await prisma.inventory.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: InventoryCreateDTO) {
    const book = await prisma.inventory.findFirst({
      where: {
        book_id: data.book_id,
      },
    });

    if (book) {
      throw new InvariantError(
        'Book already exists in inventory, please update the stock instead of creating new inventory',
      );
    }

    return await prisma.inventory.create({
      data,
    });
  }

  async update(id: number, data: InventoryUpdateDTO) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id,
      },
    });

    if (!inventory) {
      throw new NotFoundError('Inventory not found');
    }

    const book = await prisma.masterBook.findFirst({
      where: {
        id: data.book_id,
      },
    });

    if (!book) {
      throw new NotFoundError('Book not found in master book');
    }

    const isBookExistInInventory = await prisma.inventory.findFirst({
      where: {
        book_id: data.book_id,
        id: {
          not: id,
        },
      },
    });

    if (isBookExistInInventory) {
      throw new InvariantError('Book you want to update already exists in inventory, please update the stock instead');
    }

    return await prisma.inventory.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id,
      },
    });

    if (!inventory) {
      throw new NotFoundError('Inventory not found');
    }

    return await prisma.inventory.delete({
      where: {
        id,
      },
    });
  }

  async increaseStock(id: number, stock: number) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id,
      },
    });

    if (!inventory) {
      throw new NotFoundError('Inventory not found');
    }

    return await prisma.inventory.update({
      where: {
        id,
      },
      data: {
        stock: inventory.stock + stock,
      },
    });
  }

  async decreaseStock(id: number, stock: number) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id,
      },
    });

    if (!inventory) {
      throw new NotFoundError('Inventory not found');
    }

    const isMinus = inventory.stock - stock < 0;

    if (isMinus) {
      throw new InvariantError(`Stock cannot be minus, current stock: ${inventory.stock}`);
    }

    return await prisma.inventory.update({
      where: {
        id,
      },
      data: {
        stock: inventory.stock - stock,
      },
    });
  }
}

export default InventoryService;
