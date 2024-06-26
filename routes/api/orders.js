import express from 'express';
import ctrl from '../../controllers/orders.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, ctrl.listOrders);

export default router;
