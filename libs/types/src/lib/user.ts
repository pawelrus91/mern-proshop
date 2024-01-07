import type { Types } from 'mongoose';

export type User = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
} & Types.ObjectId;

export type UserRegistration = Pick<User, 'name' | 'email' | 'password'>;

export type AuthCredential = Pick<UserRegistration, 'email' | 'password'>;
