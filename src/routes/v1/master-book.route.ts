import express from 'express';
import MasterBookController from '@controllers/master-book.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(MasterBookController.findAll));
router.get('/:id', expressAsyncHandler(MasterBookController.findOne));
router.post('/', expressAsyncHandler(MasterBookController.create));
router.put('/:id', expressAsyncHandler(MasterBookController.update));
router.delete('/:id', expressAsyncHandler(MasterBookController.delete));

export default router;
