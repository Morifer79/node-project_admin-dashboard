import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const customerSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    email: { type: String },
    spent: { type: String },
    phone: { type: String },
    address: { type: String },
    register_date: { type: String },
  },
  { versionKey: false, timestamps: false }
);

customerSchema.post('save', handleMongooseError);

export const Customer = model('customer', customerSchema);
