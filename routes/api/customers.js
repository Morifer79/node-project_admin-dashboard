import express from 'express';
import ctrl from '../../controllers/customers.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, ctrl.listCustomers);

router.get('/:id', authenticate, isValidId, ctrl.getCustomerByID);

export default router;
