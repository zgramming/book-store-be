import HistoryTransactionService from '@services/history-transaction.service';
import { Request, Response } from 'express';

class HistoryTransactionController {
  constructor(private readonly historyTransactionService: HistoryTransactionService) {}

  findAll = async (req: Request, res: Response) => {
    const { limit, page, nim, name_student, book_id, book_title, date_loan, date_return, long_loan_in_days } =
      req.query;

    const { data: result, total } = await this.historyTransactionService.findAll({
      limit: Number(limit || 10),
      page: Number(page || 1),
      nim: nim as string | undefined,
      name_student: name_student as string | undefined,
      book_id: book_id ? Number(book_id) : undefined,
      book_title: book_title as string | undefined,
      date_loan: date_loan ? new Date(date_loan as string) : undefined,
      date_return: date_return ? new Date(date_return as string) : undefined,
      long_loan_in_days: long_loan_in_days ? Number(long_loan_in_days) : undefined,
    });

    res.json({
      message: 'Data has been retrieved',
      error: false,
      total,
      data: result,
    });
  };
}

export default new HistoryTransactionController(new HistoryTransactionService());
