import express from 'express';
import MasterStudentController from '@controllers/master-student.controller';

const router = express.Router();

router.get('/', MasterStudentController.findAll);
router.get('/:id', MasterStudentController.findOne);
router.post('/', MasterStudentController.create);
router.put('/:id', MasterStudentController.update);
router.delete('/:id', MasterStudentController.delete);

export default router;
