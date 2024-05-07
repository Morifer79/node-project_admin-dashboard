import { Product } from '../models/product.js';
import { HttpError } from '../helpers/HttpError.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listProducts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Product.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'subscription');
  res.json(result);
};

export const getProductById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Product.findById(id, owner);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const addProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Product.create({ ...req.body, owner });
  res.status(201).json(result);
};

export const updateProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Product.findByIdAndUpdate(owner, id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const removeProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Product.findByIdAndDelete(id, owner);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: 'Product deleted' });
};

export default {
  listProducts: ctrlWrapper(listProducts),
  getProductById: ctrlWrapper(getProductById),
  addProduct: ctrlWrapper(addProduct),
  updateProduct: ctrlWrapper(updateProduct),
  removeProduct: ctrlWrapper(removeProduct),
};
