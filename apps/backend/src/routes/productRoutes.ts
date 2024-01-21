import express from 'express';

import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controllers/productController';
import { protect, admin } from '../moddleware/authMiddleware';

const router = express.Router();

// router.get('/', getProducts);

// router.get('/:id', getProductById);

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
