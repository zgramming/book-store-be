import MasterStudentService from '@services/master-student.service';
import { Request, Response } from 'express';

class MasterStudentController {
  constructor(private readonly masterStudentService: MasterStudentService) {}

  findAll = async (req: Request, res: Response) => {
    const { limit, page, name } = req.query;

    const { data: result, total } = await this.masterStudentService.findAll({
      limit: Number(limit || 10),
      page: Number(page || 1),
      name: name as string,
    });

    res.json({
      message: 'success',
      error: false,
      total,
      data: result,
    });
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterStudentService.findOne(Number(id));

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  create = async (req: Request, res: Response) => {
    const { name, nim, status } = req.body;

    const result = await this.masterStudentService.create({
      name,
      nim,
      status,
    });

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, nim, status } = req.body;

    const result = await this.masterStudentService.update(Number(id), {
      name,
      nim,
      status,
    });

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterStudentService.delete(Number(id));

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };
}

export default new MasterStudentController(new MasterStudentService());
