import MasterBookService from '@services/master-book.service';
import { Request, Response } from 'express';

class MasterBookController {
  constructor(private readonly masterBookService: MasterBookService) {}

  findAll = async (req: Request, res: Response) => {
    const { limit, page, title } = req.query;

    const { data: result, total } = await this.masterBookService.findAll({
      limit: Number(limit || 10),
      page: Number(page || 1),
      title: title as string | undefined,
    });

    res.json({
      message: 'Success',
      error: false,
      total,
      data: result,
    });
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterBookService.findOne(Number(id));

    res.json({
      message: 'Success',
      error: false,
      data: result,
    });
  };

  create = async (req: Request, res: Response) => {
    const { title, author, publisher, year } = req.body;

    const result = await this.masterBookService.create({
      title,
      author,
      publisher,
      year: Number(year),
    });

    res.json({
      message: 'Success',
      error: false,
      data: result,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, publisher, year } = req.body;

    const result = await this.masterBookService.update(Number(id), {
      title,
      author,
      publisher,
      year : Number(year),
    });

    res.json({
      message: 'Success',
      error: false,
      data: result,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterBookService.delete(Number(id));

    res.json({
      message: 'Success',
      error: false,
      data: result,
    });
  };
}

export default new MasterBookController(new MasterBookService());
