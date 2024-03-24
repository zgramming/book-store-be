import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import { prisma } from '@utils/prisma';
import { hashSync } from 'bcrypt';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
  role_id?: number;
}
interface UserCreateDTO {
  role_id: number;
  name: string;
  email?: string;
  username: string;
  password: string;
  status: any;
  phone?: string;
  image?: string;
  created_by: number;
}

interface UserUpdateDTO extends Partial<UserCreateDTO> {
  updated_by: number;
}

class UserService {
  async findAll({ limit, page, name, role_id }: FindAllQueryParams) {
    const result = await prisma.users.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: { 
          contains: name,
          mode: 'insensitive',
        },
        role_id: role_id,
      },
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const total = await prisma.users.count({
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

  async findById(id: number) {
    const result = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: UserCreateDTO) {
    const result = await prisma.users.create({
      data: {
        ...data,
        password: hashSync(data.password, 10),
      },
    });

    return result;
  }

  async update(id: number, data: UserUpdateDTO) {
    const result = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        password: data.password ? hashSync(data.password, 10) : undefined,
      },
    });

    return result;
  }

  async changePassword(id: number, password: string) {
    const result = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        password: hashSync(password, 10),
      },
    });

    return result;
  }

  async delete(id: number) {
    const result = await prisma.users.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default UserService;