import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  credits:  number;
}

const usersSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0,
  },
});

mongoose.model<IUser>('users', usersSchema);
