import { Order } from '../models/order.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listOrders = async (req, res) => {
  const { page = '1', limit = '5', name } = req.query;
  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);
  const skipNumber = (pageNumber - 1) * limitNumber;
  const totalOrders = await Order.countDocuments();
  const result = await Order.find({name})
    .skip(skipNumber)
    .limit(limitNumber);

  res.json({
    result,
    limit: limitNumber,
    page: pageNumber,
    total: totalOrders,
  });
};

export default {
  listOrders: ctrlWrapper(listOrders),
};
