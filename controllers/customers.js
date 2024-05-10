import { Customer } from '../models/customer.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listCustomers = async (req, res) => {
  const { page = '1', limit = '5' } = req.query;
  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);
  const skipNumber = (pageNumber - 1) * limitNumber;
  const totalCustomers = await Customer.countDocuments();
  const result = await Customer.find().skip(skipNumber).limit(limitNumber);

  res.json({
    result,
    limit: limitNumber,
    page: pageNumber,
    total: totalCustomers,
  });
};

const getCustomerByID = async (req, res) => {
  const { id } = req.params;
  const result = await Customer.findById(id);
  if (!result) {
    return res.status(404);
  }
  res.json(result);
};

export default {
  listCustomers: ctrlWrapper(listCustomers),
  getCustomerByID: ctrlWrapper(getCustomerByID),
};
