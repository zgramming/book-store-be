import InvariantError from '@utils/exceptions/invariant-error';
import { prisma } from '@utils/prisma';

interface AppAccessMenuCreateDTO {
  role_id: number;
  app_category_modul_id: number;
  app_modul_id: number;
  app_menu_id: number;
  permissions: string[];
  created_by: number;
}

class AppAccessMenuService {
  async getByRoleId(roleId: number, categoryModulId: number) {
    const accessModulByRole = await prisma.appAccessModul.findMany({
      where: {
        role_id: roleId,
        app_category_modul_id: categoryModulId,
      },
      select: {
        id: true,
        app_category_modul_id: true,
        app_modul_id: true,
        role_id: true,
        app_modul: {
          select: {
            id: true,
            app_category_modul_id: true,
            name: true,
            code: true,
            menus: {
              select: {
                id: true,
                app_menu_id_parent: true,
                app_category_modul_id: true,
                app_modul_id: true,
                code: true,
                name: true,
                order: true,
                menu_childrens: {
                  select: {
                    id: true,
                    app_menu_id_parent: true,
                    app_category_modul_id: true,
                    app_modul_id: true,
                    code: true,
                    name: true,
                    order: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const mappingOnlyModul = accessModulByRole.map((item) => {
      return {
        ...item.app_modul,
      };
    });

    const accessMenuByRole = await prisma.appAccessMenu.findMany({
      where: {
        role_id: roleId,
      },
      select: {
        id: true,
        role_id: true,
        app_category_modul_id: true,
        app_modul_id: true,
        app_menu_id: true,
        permissions: true,
      },
    });

    return {
      accessible_modul: mappingOnlyModul,
      selected_access_menu: accessMenuByRole,
    };
  }

  async createBulk(data: AppAccessMenuCreateDTO[]) {
    if (data.length <= 0) {
      throw new InvariantError('Data cannot be empty');
    }

    const firstData = data[0];

    const result = await prisma.$transaction(async (trx) => {
      // Delete all data by role_id then create new data
      await trx.appAccessMenu.deleteMany({
        where: {
          role_id: firstData.role_id,
        },
      });

      return await trx.appAccessMenu.createMany({
        data: data.map((item) => ({
          app_category_modul_id: item.app_category_modul_id,
          app_modul_id: item.app_modul_id,
          role_id: item.role_id,
          app_menu_id: item.app_menu_id,
          permissions: item.permissions,
          created_by: item.created_by,
        })),
      });
    });

    return result;
  }
}

export default AppAccessMenuService;