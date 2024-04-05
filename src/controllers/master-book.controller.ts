import MasterBookService from '@services/master-book.service';
import { Request, Response } from 'express';

class MasterBookController {
  constructor(private readonly masterBookService: MasterBookService) {}

  findAll = async (req: Request, res: Response) => {
    const { limit, page, title } = req.query;

    const result = await this.masterBookService.findAll({
      limit: Number(limit),
      page: Number(page),
      title: title as string,
    });

    res.json(result);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterBookService.findOne(Number(id));

    res.json(result);
  };

  create = async (req: Request, res: Response) => {
    const { title, author, publisher, year } = req.body;

    const result = await this.masterBookService.create({
      title,
      author,
      publisher,
      year,
    });

    res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, publisher, year } = req.body;

    const result = await this.masterBookService.update(Number(id), {
      title,
      author,
      publisher,
      year,
    });

    res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterBookService.delete(Number(id));

    res.json(result);
  };
}

export default new MasterBookController(new MasterBookService());
