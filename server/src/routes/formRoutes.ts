// import express from 'express';
// import {
//   formsGet,
//   searchForms,
//   createForm,
//   getFormById,
//   deleteForm,
//   editForm,
//   getAllFormsOfUser,
//   submitResponse,
//   allResponses,
//   getResponse,
// } from '../controllers/formController';

// const router = express.Router();

// router.get('/', formsGet);
// router.get('/search', searchForms);
// router.post('/', createForm);
// router.get('/:formId', getFormById);
// router.delete('/:formId/:userId', deleteForm);
// router.put('/:formId', editForm);
// router.get('/user/:userId', getAllFormsOfUser);
// router.post('/:formId/submit', submitResponse);
// router.get('/responses/all', allResponses);
// router.get('/:formId/responses', getResponse);

// export default router;

import { Router } from 'express';
import { createForm, deleteForm, formsGet, getFormById } from '../controllers/formController';

const router = Router();

router.post('/create', createForm);
router.get('/', formsGet);
router.get('/get/:formId', getFormById);
router.delete('/delete/:formId/:userId', deleteForm);

export default router;
