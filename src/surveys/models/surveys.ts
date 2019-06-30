import mongoose, { Schema, Document } from 'mongoose';
import recipientSchema, { IRecipient } from './recipients';
import { IUser } from '../../mongo/models/users';

export interface ISurvey extends Document {
  title:      string;
  body:       string;
  subject:    string;
  yes:        number;
  no:         number;

  recipients:     IRecipient[];
  _user:          IUser;
  createdAt:      Date,
  lastResponded:  Date,
}

const surveySchema = new Schema({
  title:      String,
  body:       String,
  subject:    String,
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
  recipients: [recipientSchema],
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt:      Date,
  lastResponded:  Date,
});

mongoose.model<ISurvey>('surveys', surveySchema);
