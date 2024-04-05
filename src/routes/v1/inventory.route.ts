import inventoryController from '@controllers/inventory.controller';
import express from 'express';

const router = express.Router();

router.get('/', inventoryController.findAll);
router.get('/:id', inventoryController.findOne);
router.post('/', inventoryController.create);

router.put('/:id', inventoryController.update);
router.put('/:id/increase-stock', inventoryController.increaseStock);
router.put('/:id/decrease-stock', inventoryController.decreaseStock);

router.delete('/:id', inventoryController.delete);

export default router;
