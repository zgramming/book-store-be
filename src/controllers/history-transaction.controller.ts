import HistoryTransactionService from '@services/history-transaction.service';
import { Request, Response } from 'express';

class HistoryTransactionController {
  constructor(private readonly historyTransactionService: HistoryTransactionService) {}

  findAll = async (req: Request, res: Response) => {
    const { limit, page, nim, name_student, book_id, book_title, date_loan, date_return, long_loan_in_days } =
      req.query;

    const result = await this.historyTransactionService.findAll({
      limit: Number(limit),
      page: Number(page),
      nim: nim as string | undefined,
      name_student: name_student as string | undefined,
      book_id: book_id as number | undefined,
      book_title: book_title as string | undefined,
      date_loan: date_loan as Date | undefined,
      date_return: date_return as Date | undefined,
      long_loan_in_days: long_loan_in_days as number | undefined,
    });

    res.json(result);
  };
}

export default new HistoryTransactionController(new HistoryTransactionService());
