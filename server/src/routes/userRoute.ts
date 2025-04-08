import express from 'express';
import {
  blockUser,
  deleteUser,
  getAllUsers,
  getUserById,
  unblockUser
} from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/block/:id', blockUser);
router.put('/unblock/:id', unblockUser);
router.delete('/:id', deleteUser);

export default router;
