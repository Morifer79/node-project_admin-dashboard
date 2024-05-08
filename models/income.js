import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const incomeSchema = new Schema(
  {
    name: String,
    amount: String,
    type: String,
  },
  { versionKey: false, timestamps: true }
);

incomeSchema.post('save', handleMongooseError);

export const Income = model('income', incomeSchema);
