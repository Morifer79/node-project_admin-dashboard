import express from "express";
import logger from "morgan";
import cors from "cors";
import customersRouter from './routes/api/customers.js';
import ordersRouter from './routes/api/orders.js';
import productsRouter from './routes/api/products.js';
import suppliersRouter from './routes/api/suppliers.js';
import dashboardsRouter from './routes/api/dashboards.js';
import authRouter from "./routes/api/auth.js";
import dotenv from "dotenv";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

dotenv.config();

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/user", authRouter);
app.use("/api/customers", customersRouter);
app.use("/api/orders", ordersRouter);
app.use('/api/products', productsRouter);
app.use('/api/suppliers', suppliersRouter);
app.use('/api/dashboard', dashboardsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
