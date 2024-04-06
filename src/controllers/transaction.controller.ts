import TransactionService from '@services/transaction.service';
import { Request, Response } from 'express';

class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  findAll = async (req: Request, res: Response) => {
    const { limit, page, date_loan, date_return, student_name } = req.query;

    const { data: result, total } = await this.transactionService.findAll({
      limit: Number(limit || 10),
      page: Number(page || 1),
      date_loan: date_loan ? new Date(date_loan as string) : undefined,
      date_return: date_return ? new Date(date_return as string) : undefined,
      student_name: student_name ? (student_name as string) : undefined,
    });

    res.json({
      message: 'success',
      error: false,
      total,
      data: result,
    });
  };

  findDetail = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.transactionService.findDetail(Number(id));

    res.json({
      message: 'success',
      error: false,
      data: result,
    });
  };

  create = async (req: Request, res: Response) => {
    const { student_id, date_loan, date_return, items } = req.body;

    const result = await this.transactionService.create({
      student_id: Number(student_id),
      date_loan: new Date(date_loan),
      date_return: new Date(date_return),
      items,
    });

    res.json(result);
  };

  returnBook = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.transactionService.returnBook(Number(id));

    res.json(result);
  };
}

export default new TransactionController(new TransactionService());
