import express from 'express';
import MasterStudentController from '@controllers/master-student.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(MasterStudentController.findAll));
router.get('/:id', expressAsyncHandler(MasterStudentController.findOne));
router.post('/', expressAsyncHandler(MasterStudentController.create));
router.put('/:id', expressAsyncHandler(MasterStudentController.update));
router.delete('/:id', expressAsyncHandler(MasterStudentController.delete));

export default router;
