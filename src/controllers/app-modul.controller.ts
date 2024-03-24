import AppModulService from '@services/app-modul.service';
import { Request, Response } from 'express';

class AppModulControler {
  constructor(private appModulService: AppModulService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit || 100;
    const name = query.name as string | undefined;
    const categoryModulId = query.category_modul_id as string | undefined;

    const { data: result, total } = await this.appModulService.findAll({
      page: +page,
      limit: +limit,
      name,
      category_modul_id: categoryModulId ? +categoryModulId : undefined,
    });

    res
      .json({
        error: false,
        message: 'Success',
        total,
        data: result,
      })
      .status(200);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.appModulService.findById(+id);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.appModulService.create(data);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(201);
  };

  update = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;

    const result = await this.appModulService.update(+id, data);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.appModulService.delete(+id);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };
}

export default new AppModulControler(new AppModulService());