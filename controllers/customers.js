import { Customer } from '../models/customer.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listCustomers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Customer.find({ skip, limit });
  res.json(result);
};

const getCustomerByID = async (req, res) => {
  const { id } = req.params;
  const result = await Customer.findById(id);
  if (!result) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  res.json(result);
};

export default {
  listCustomers: ctrlWrapper(listCustomers),
  getCustomerByID: ctrlWrapper(getCustomerByID),
};
