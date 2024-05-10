import { Product } from '../models/product.js';
import { HttpError } from '../helpers/HttpError.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listProducts = async (req, res) => {
  const { page = '1', limit = '5' } = req.query;
  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);
  const skipNumber = (pageNumber - 1) * limitNumber;
  const totalProducts = await Product.countDocuments();
  const result = await Product.find().skip(skipNumber).limit(limitNumber);

  res.json({
    result,
    limit: limitNumber,
    page: pageNumber,
    total: totalProducts,
  });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const addProduct = async (req, res) => {
  const result = await Product.create({ ...req.body });
  res.status(201).json(result);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndDelete(id);
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
