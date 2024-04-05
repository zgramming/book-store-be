import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import { CommonStatus } from '@prisma/client';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
}

interface MasterStudentCreateDTO {
  name: string;
  nim: string;
  status: string;
}

interface MasterStudentUpdateDTO extends Partial<MasterStudentCreateDTO> {}

class MasterStudentService {
  async findAll({ limit, page, name }: FindAllQueryParams) {
    const result = await prisma.masterStudent.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.masterStudent.count({
      where: {
        name: {
          contains: name,
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
    return await prisma.masterStudent.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: MasterStudentCreateDTO) {
    return await prisma.masterStudent.create({
      data: {
        ...data,
        status: data.status as CommonStatus,
      },
    });
  }

  async update(id: number, data: MasterStudentUpdateDTO) {
    const student = await prisma.masterStudent.findFirst({
      where: {
        id,
      },
    });

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    return await prisma.masterStudent.update({
      where: {
        id,
      },
      data: {
        ...data,
        status: data.status as CommonStatus,
      },
    });
  }

  async delete(id: number) {
    const student = await prisma.masterStudent.findFirst({
      where: {
        id,
      },
    });

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    return await prisma.masterStudent.delete({
      where: {
        id,
      },
    });
  }
}

export default MasterStudentService;
