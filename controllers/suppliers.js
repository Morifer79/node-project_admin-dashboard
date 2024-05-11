import { Supplier } from '../models/supplier.js';
import { HttpError } from '../helpers/HttpError.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listSuppliers = async (req, res) => {
  const { page = '1', limit = '5', name } = req.query;
  const searchValue = name ? { name: { $regex: name, $options: 'i' } } : {};
  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);
  const skipNumber = (pageNumber - 1) * limitNumber;
  const totalSuppliers = await Supplier.countDocuments(searchValue);
  const result = await Supplier.find(searchValue)
    .skip(skipNumber)
    .limit(limitNumber);

  res.json({
    result,
    limit: limitNumber,
    page: pageNumber,
    total: totalSuppliers,
  });
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
  const result = await Supplier.findByIdAndUpdate(id, req.body, { new: true });
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
