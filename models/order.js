import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const orderSchema = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    products: {
      type: String,
    },
    price: {
      type: String,
    },
    status: {
      type: String,
    },
    order_date: {
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

orderSchema.post('save', handleMongooseError);

export const Order = model('order', orderSchema);
