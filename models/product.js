import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const categories = [
  'Medicine',
  'Head',
  'Hand',
  'Dental Care',
  'Skin Care',
  'Eye Care',
  'Vitamins & Supplements',
  'Orthopedic Products',
  'Baby Care',
];

const productSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    suppliers: { type: String },
    stock: { type: Number },
    price: { type: Number },
    category: { type: String, enum: categories },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required name field' }),
  suppliers: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required suppliers field' }),
  stock: Joi.number()
    .required()
    .messages({ 'any.required': 'missing required stock field' }),
  price: Joi.number()
    .required()
    .messages({ 'any.required': 'missing required price field' }),
  category: Joi.string()
    .valid(...categories)
    .required()
    .messages({ 'any.required': 'missing required category field' }),
});

const updateSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string(),
  suppliers: Joi.string(),
  stock: Joi.number(),
  price: Joi.number(),
  category: Joi.string(),
});

export const schemas = { addSchema, updateSchema };

export const Product = model('product', productSchema);
