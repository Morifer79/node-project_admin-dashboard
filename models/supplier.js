import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for supplier'],
    },
    address: {
      type: String,
    },
    suppliers: {
      type: String,
    },
    date: {
      type: String,
    },
    amount: {
      type: Boolean,
      type: String,
    },
    status: {
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

export const schemas = {
  addSchema,
};

export const Supplier = model('supplier', supplierSchema);
