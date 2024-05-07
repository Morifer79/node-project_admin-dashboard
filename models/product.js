import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const productSchema = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Set name for product'],
    },
    suppliers: {
      type: String,
    },
    stock: {
      type: String,
    },
    price: {
      type: Boolean,
      type: String,
    },
    category: {
      type: Boolean,
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

productSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required name field' }),
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

export const schemas = {
  addSchema,
};

export const Product = model('product', productSchema);
