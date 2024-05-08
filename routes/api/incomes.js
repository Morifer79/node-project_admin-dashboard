import express from 'express';
import ctrl from '../../controllers/incomes.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, ctrl.listIncome);

export default router;
