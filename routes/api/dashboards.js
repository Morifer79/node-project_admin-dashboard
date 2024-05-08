import express from 'express';
import ctrl from '../../controllers/dashboards.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, ctrl.listDashboard);

export default router;
