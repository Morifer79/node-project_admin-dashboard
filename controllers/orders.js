import { Order } from '../models/order.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listOrders = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Order.find({ skip, limit });
  res.json(result);
};

export default {
  listOrders: ctrlWrapper(listOrders),
};
