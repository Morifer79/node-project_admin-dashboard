import { Schema, model } from 'mongoose';

const incomeSchema = new Schema(
  {
    name: String,
    amount: String,
    type: String,
  },
  { versionKey: false, timestamps: true }
);

export const Income = model('income', incomeSchema);
