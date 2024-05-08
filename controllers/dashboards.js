import { Supplier } from '../models/supplier.js';
import { Product } from "../models/product.js";
import { Customer } from '../models/customer.js';
import { Income } from '../models/income.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

const listDashboard = async (_, res) => {
  const suppliersCount = await Supplier.countDocuments();
  const productsCount = await Product.countDocuments();
  const customersCount = await Customer.countDocuments();

  const recentCustomers = await (await Customer.find()).splice(customersCount - 5, customersCount);
  const incomeExpenses = await Income.find();

  res.json({
    suppliersCount,
    productsCount,
    customersCount,
    recentCustomers,
    incomeExpenses,
  });
};

export default {
  listDashboard: ctrlWrapper(listDashboard),
};