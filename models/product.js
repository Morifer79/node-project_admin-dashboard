import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const productSchema = new Schema(
  {
    image: { type: String },
    product: { type: String },
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
  product: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required product field' }),
  suppliers: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required suppliers field' }),
  stock: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required stock field' }),
  price: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required price field' }),
  category: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required category field' }),
});

export const schemas = {addSchema};

export const Product = model('product', productSchema);
