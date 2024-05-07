import express from 'express';
import ctrl from '../../controllers/customers.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, ctrl.listCustomers);

export default router;
