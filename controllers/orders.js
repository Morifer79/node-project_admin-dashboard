import { Order } from '../models/order.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const listOrders = async (req, res) => {
  const { page = '1', limit = '5' } = req.query;
  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);
   const skipNumber = (pageNumber - 1) * limitNumber;
  const result = await Order.find()
    .skip(skipNumber)
    .limit(limitNumber);

  res.json({
    result,
    limit: limitNumber,
    page: pageNumber,
  });
};

export default {
  listOrders: ctrlWrapper(listOrders),
};
