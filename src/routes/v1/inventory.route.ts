import inventoryController from '@controllers/inventory.controller';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(inventoryController.findAll));
router.get('/:id', expressAsyncHandler(inventoryController.findOne));
router.post('/', expressAsyncHandler(inventoryController.create));

router.put('/:id', expressAsyncHandler(inventoryController.update));
router.put('/:id/increase-stock', expressAsyncHandler(inventoryController.increaseStock));
router.put('/:id/decrease-stock', expressAsyncHandler(inventoryController.decreaseStock));

router.delete('/:id', expressAsyncHandler(inventoryController.delete));

export default router;
