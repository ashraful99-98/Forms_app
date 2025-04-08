import { Request, Response } from 'express';
import User from '../models/User';

// Get all users (with pagination)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await (User as any).paginate({}, {
      page: Number(page),
      limit: Number(limit)
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Block user
export const blockUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) {
      res.status(404).json({ message: 'User not found or deleted' });
      return;
    }
    user.isBlocked = true;
    await user.save();
    res.status(200).json({ message: 'User blocked', user });
  } catch (error) {
    res.status(500).json({ message: 'Error blocking user', error });
  }
};

// Unblock user
export const unblockUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) {
      res.status(404).json({ message: 'User not found or deleted' });
      return;
    }
    user.isBlocked = false;
    await user.save();
    res.status(200).json({ message: 'User unblocked', user });
  } catch (error) {
    res.status(500).json({ message: 'Error unblocking user', error });
  }
};

// Soft delete user
// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user || user.isDeleted) {
//       res.status(404).json({ message: 'User not found or already deleted' });
//       return;
//     }
//     user.isDeleted = true;
//     await user.save();
//     res.status(200).json({ message: 'User soft deleted', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting user', error });
//   }
// };



export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User permanently deleted', user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
