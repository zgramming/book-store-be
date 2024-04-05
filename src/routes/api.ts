import express from 'express';
import MasterBookRouter from './v1/master-book.route';
import MasterStudentRouter from './v1/master-student.route';
import InventoryRouter from './v1/inventory.route';
import TransactionRouter from './v1/transaction.route';
import HistoryTransactionRouter from './v1/history-transaction.route';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.use('/master-books', MasterBookRouter);
router.use('/master-students', MasterStudentRouter);
router.use('/inventories', InventoryRouter);
router.use('/transactions', TransactionRouter);
router.use('/history-transactions', HistoryTransactionRouter);

export default router;
