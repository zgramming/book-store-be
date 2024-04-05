import InventoryService from '@services/inventory.service';
import { Request, Response } from 'express';

class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  findAll = async (req: Request, res: Response) => {
    const { limit, page, title, location } = req.query;

    const result = await this.inventoryService.findAll({
      limit: Number(limit),
      page: Number(page),
      title: title as string,
      location: location as string,
    });

    return res.json(result);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.inventoryService.findOne(Number(id));

    return res.json(result);
  };

  create = async (req: Request, res: Response) => {
    const { location, book_id, stock } = req.body;

    const result = await this.inventoryService.create({
      book_id,
      location,
      stock,
    });

    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { location, book_id } = req.body;

    const result = await this.inventoryService.update(Number(id), {
      location,
      book_id,
    });

    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.inventoryService.delete(Number(id));

    return res.json(result);
  };

  increaseStock = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { stock } = req.body;

    const result = await this.inventoryService.increaseStock(Number(id), stock);

    return res.json(result);
  };

  decreaseStock = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { stock } = req.body;

    const result = await this.inventoryService.decreaseStock(Number(id), stock);

    return res.json(result);
  };
}

export default new InventoryController(new InventoryService());
