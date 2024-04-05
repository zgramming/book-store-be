import TransactionService from '@services/transaction.service';
import { Request, Response } from 'express';

class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  create = async (req: Request, res: Response) => {
    const { student_id, date_loan, date_return, status, book } = req.body;

    const result = await this.transactionService.create({
      student_id: Number(student_id),
      date_loan: new Date(date_loan),
      date_return: new Date(date_return),
      status,
      book,
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
