import InventoryService from '@services/inventory.service';
import { Request, Response } from 'express';

class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  findAll = async (req: Request, res: Response) => {
    const { limit, page, title, location } = req.query;

    const { data: result, total } = await this.inventoryService.findAll({
      limit: Number(limit || 10),
      page: Number(page || 1),
      title: title as string,
      location: location as string,
    });

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.inventoryService.findOne(Number(id));

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  create = async (req: Request, res: Response) => {
    const { location, book_id, stock } = req.body;

    const result = await this.inventoryService.create({
      book_id: Number(book_id),
      location,
      stock: Number(stock),
    });

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { location, book_id } = req.body;

    const result = await this.inventoryService.update(Number(id), {
      location,
      book_id: Number(book_id),
    });

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.inventoryService.delete(Number(id));

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  increaseStock = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { stock } = req.body;

    const result = await this.inventoryService.increaseStock(Number(id), Number(stock));

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  decreaseStock = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { stock } = req.body;

    const result = await this.inventoryService.decreaseStock(Number(id), Number(stock));

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };
}

export default new InventoryController(new InventoryService());
