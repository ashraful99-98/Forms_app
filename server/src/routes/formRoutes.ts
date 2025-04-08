import { Router } from 'express';
import { createForm, deleteForm, editForm, formsGet, getAllFormsOfUser, getFormById, submitResponse } from '../controllers/formController';

const router = Router();

router.post('/create', createForm);
router.get('/', formsGet);
router.get('/get/:formId', getFormById);
router.delete('/delete/:formId/:userId', deleteForm);
router.put('/edit', editForm);
router.get('/user/:userId', getAllFormsOfUser);
router.post('/submit', submitResponse);

export default router;
