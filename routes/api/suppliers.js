import express from 'express';
import ctrl from '../../controllers/suppliers.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { validateField } from '../../middlewares/validateField.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { schemas } from '../../models/supplier.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, ctrl.listSuppliers);

router.get('/:id', authenticate, isValidId, ctrl.getSupplierById);

router.post(
  '/',
  authenticate,
  validateField,
  validateBody(schemas.addSchema),
  ctrl.addSupplier
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateField,
  validateBody(schemas.addSchema),
  ctrl.updateSupplier
);

export default router;
