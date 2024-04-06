import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import TransactionController from '@controllers/transaction.controller';

const router = express.Router();

router.get('/:id', expressAsyncHandler(TransactionController.findDetail));
router.get('/', expressAsyncHandler(TransactionController.findAll));

router.post('/', expressAsyncHandler(TransactionController.create));

router.put('/:id/return', expressAsyncHandler(TransactionController.returnBook));


export default router;
