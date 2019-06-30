import { Schema, Document } from 'mongoose';

export interface IRecipient extends Document {
  email:      string;
  responded:  boolean;
}

const recipientSchema = new Schema({
  email:      String,
  responded: {
    type: Boolean,
    default: false,
  },
});

export default recipientSchema;
