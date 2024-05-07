import express from 'express';
import ctrl from '../../controllers/products.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { validateField } from '../../middlewares/validateField.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { schemas } from '../../models/product.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, ctrl.listProducts);

router.get('/:id', authenticate, isValidId, ctrl.getProductById);

router.post(
  '/',
  authenticate,
  validateField,
  validateBody(schemas.addSchema),
  ctrl.addProduct
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateField,
  validateBody(schemas.addSchema),
  ctrl.updateProduct
);

router.delete('/:id', authenticate, isValidId, ctrl.removeProduct);

export default router;
