import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const productSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    suppliers: { type: String },
    stock: { type: String },
    price: { type: String },
    category: { type: String },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string(),
  suppliers: Joi.string(),
  stock: Joi.string(),
  price: Joi.string(),
  category: Joi.string(),
});

export const schemas = {addSchema};

export const Product = model('product', productSchema);
