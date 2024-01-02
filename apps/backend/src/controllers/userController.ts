import asyncHandler from '../moddleware/asyncHandler';

// import { Product } from '@mern-proshop/database';
import type { Request, Response } from 'express';

/**
 * @description Auth user & get token
 * @route       POST /api/users/login
 * @access      Public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('auth user');
});

/**
 * @description Register user
 * @route       POST /api/users
 * @access      Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('register user');
});

/**
 * @description Logout user
 * @route       POST /api/users/logout
 * @access      Private
 */
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('logout user');
});

/**
 * @description Get user profile
 * @route       GET /api/users/profile
 * @access      Private
 */
const userProfile = asyncHandler(async (req: Request, res: Response) => {
  res.send('get user profile');
});

/**
 * @description Get user profile
 * @route       PUT /api/users/profile
 * @access      Private
 */
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.send('update user profile');
});

/**
 * @description Get users
 * @route       GET /api/users
 * @access      Private/Admin
 */
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.send('get users');
});

/**
 * @description Get user by ID
 * @route       GET /api/users/:id
 * @access      Private/Admin
 */
const getUserById = asyncHandler(async (req: Request, res: Response) => {
  res.send('get user by id');
});

/**
 * @description Delete user
 * @route       DELETE /api/users/:id
 * @access      Private/Admin
 */
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('delete user');
});

/**
 * @description Delete user
 * @route       PUT /api/users/:id
 * @access      Private/Admin
 */
const updateUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  userProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
