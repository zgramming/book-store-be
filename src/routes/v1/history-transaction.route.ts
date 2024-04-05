import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import HistoryTransactionController from '@controllers/history-transaction.controller';

const router = express.Router();

router.get('/', expressAsyncHandler(HistoryTransactionController.findAll));

export default router;
