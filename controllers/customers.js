import { Customer } from '../models/customer.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listCustomers = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Customer.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'subscription');
  res.json(result);
};

export default {
  listCustomers: ctrlWrapper(listCustomers),
};
