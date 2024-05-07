import { Supplier } from '../models/supplier.js';
import { HttpError } from '../helpers/HttpError.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listSuppliers = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Supplier.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'subscription');
  res.json(result);
};

export const getSupplierById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Supplier.findById(id, owner);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const addSupplier = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Supplier.create({ ...req.body, owner });
  res.status(201).json(result);
};

export const updateSupplier = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Supplier.findByIdAndUpdate(owner, id, req.body, {
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
