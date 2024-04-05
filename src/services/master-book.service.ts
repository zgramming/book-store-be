import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  title?: string;
}

interface MasterBookCreateDTO {
  title: string;
  author: string;
  publisher: string;
  year: number;
}

interface MasterBookUpdateDTO extends Partial<MasterBookCreateDTO> {}

class MasterBookService {
  async findAll({ limit, page, title }: FindAllQueryParams) {
    const result = await prisma.masterBook.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.masterBook.count({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
    });

    return {
      data: result,
      total,
    };
  }

  async findOne(id: number) {
    const book = await prisma.masterBook.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      throw new NotFoundError('Book not found');
    }

    return book;
  }

  async create(data: MasterBookCreateDTO) {
    return await prisma.masterBook.create({
      data,
    });
  }

  async update(id: number, data: MasterBookUpdateDTO) {
    const book = await prisma.masterBook.findFirst({
      where: {
        id,
      },
    });

    if (!book) {
      throw new NotFoundError('Book not found');
    }

    return await prisma.masterBook.update({
      where: {
        id: book.id,
      },
      data,
    });
  }

  async delete(id: number) {
    const book = await prisma.masterBook.findFirst({
      where: {
        id,
      },
    });

    if (!book) {
      throw new NotFoundError('Book not found');
    }

    return await prisma.masterBook.delete({
      where: {
        id: book.id,
      },
    });
  }
}

export default MasterBookService;
