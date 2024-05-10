import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const supplierSchema = new Schema(
  {
    name: { type: String },
    address: { type: String },
    suppliers: { type: String },
    date: { type: String },
    amount: { type: String },
    status: { type: String },
  },
  { versionKey: false, timestamps: true }
);

supplierSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required name field' }),
  address: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required address field' }),
  suppliers: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required suppliers field' }),
  date: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required date field' }),
  amount: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required amount field' }),
  status: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required status field' }),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  suppliers: Joi.string(),
  date: Joi.string(),
  amount: Joi.string(),
  status: Joi.string(),
});

export const schemas = { addSchema, updateSchema };

export const Supplier = model('supplier', supplierSchema);
