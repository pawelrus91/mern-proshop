import asyncHandler from '../moddleware/asyncHandler';
import { User } from '@mern-proshop/database';

import type {
  AuthCredential,
  UserRegistration,
  User as TUser,
} from '@mern-proshop/types';
import type { Request, Response } from 'express';
import generateToken from '../utils/generateToken';

/**
 * @description Auth user & get token
 * @route       POST /api/users/login
 * @access      Public
 */
const authUser = asyncHandler(
  async (
    req: Request<Record<string, string>, undefined, AuthCredential>,
    res: Response
  ) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isMatch = await user?.matchPassword(password);

    if (user && isMatch) {
      generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }
);

/**
 * @description Register user
 * @route       POST /api/users
 * @access      Public
 */
const registerUser = asyncHandler(
  async (
    req: Request<Record<string, string>, undefined, UserRegistration>,
    res: Response
  ) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
);

/**
 * @description Logout user
 * @route       POST /api/users/logout
 * @access      Private
 */
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

/**
 * @description Get user profile
 * @route       GET /api/users/profile
 * @access      Private
 */
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const user = await User.findById(req.user?._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @description Update user profile
 * @route       PUT /api/users/profile
 * @access      Private
 */
const updateUserProfile = asyncHandler(
  async (
    req: Request<Record<string, string>, undefined, TUser>,
    res: Response
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await User.findById(req.user?._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      generateToken(res, updatedUser._id);

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
);

/**
 * @description Get users
 * @route       GET /api/users
 * @access      Private/Admin
 */
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});

  res.status(200).json(users);
});

/**
 * @description Get user by ID
 * @route       GET /api/users/:id
 * @access      Private/Admin
 */
const getUserById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
);

/**
 * @description Delete user
 * @route       DELETE /api/users/:id
 * @access      Private/Admin
 */
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @description Delete user
 * @route       PUT /api/users/:id
 * @access      Private/Admin
 */
const updateUser = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin =
        typeof req.body.isAdmin === 'boolean' ? req.body.isAdmin : user.isAdmin;

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
);

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
