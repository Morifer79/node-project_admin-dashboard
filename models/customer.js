import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const customerSchema = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    spent: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    register_date: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

customerSchema.post('save', handleMongooseError);

export const Customer = model('customer', customerSchema);
