import express from 'express';

import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController';
import { protect, admin } from '../middleware/authMiddleware';
import checkObjectId from '../middleware/checkObjectId';

const router = express.Router();

// router.get('/', getProducts);

// router.get('/:id', getProductById);

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

export default router;
