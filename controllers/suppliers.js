import { Supplier } from '../models/supplier.js';
import { HttpError } from '../helpers/HttpError.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listSuppliers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Supplier.find({
    skip,
    limit,
  })
  res.json(result);
};

export const getSupplierById = async (req, res) => {
  const { id } = req.params;
  const result = await Supplier.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const addSupplier = async (req, res) => {
  const result = await Supplier.create({ ...req.body });
  res.status(201).json(result);
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const result = await Supplier.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  listSuppliers: ctrlWrapper(listSuppliers),
  getSupplierById: ctrlWrapper(getSupplierById),
  addSupplier: ctrlWrapper(addSupplier),
  updateSupplier: ctrlWrapper(updateSupplier),
};
