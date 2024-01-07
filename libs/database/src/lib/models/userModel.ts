import mongoose, { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';

import { User as TUser } from '@mern-proshop/types';

type UserMethod = {
  matchPassword: (enteredPassword: TUser['password']) => Promise<boolean>;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type UserModel = Model<TUser, object, UserMethod>;

const userSchema = new mongoose.Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods['matchPassword'] = async function (
  enteredPassword: TUser['password']
) {
  return await compare(enteredPassword, this['password']);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await genSalt(10);

  this.password = await hash(this.password, salt);
});

const User = mongoose.model<TUser, UserModel>('User', userSchema);

export default User;
