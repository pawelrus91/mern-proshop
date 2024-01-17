import express from 'express';

import {
  getProductById,
  getProducts,
  createProduct,
} from '../controllers/productController';
import { protect, admin } from '../moddleware/authMiddleware';

const router = express.Router();

// router.get('/', getProducts);

// router.get('/:id', getProductById);

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById);

export default router;
