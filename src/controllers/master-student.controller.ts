import MasterStudentService from '@services/master-student.service';
import { Request, Response } from 'express';

class MasterStudentController {
  constructor(private readonly masterStudentService: MasterStudentService) {}

  findAll = async (req: Request, res: Response) => {
    const { limit, page, name } = req.query;

    const result = await this.masterStudentService.findAll({
      limit: Number(limit),
      page: Number(page),
      name: name as string,
    });

    res.json(result);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterStudentService.findOne(Number(id));

    res.json(result);
  };

  create = async (req: Request, res: Response) => {
    const { name, nim, status } = req.body;

    const result = await this.masterStudentService.create({
      name,
      nim,
      status,
    });

    res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, nim, status } = req.body;

    const result = await this.masterStudentService.update(Number(id), {
      name,
      nim,
      status,
    });

    res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterStudentService.delete(Number(id));

    res.json(result);
  };
}

export default new MasterStudentController(new MasterStudentService());
