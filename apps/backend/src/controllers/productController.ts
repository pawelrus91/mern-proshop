import asyncHandler from '../moddleware/asyncHandler';

import { Product } from '@mern-proshop/database';
import type { Request, Response } from 'express';

/**
 * @description Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.send(products);
});

/**
 * @description Fetch a product
 * @route       GET /api/products/:id
 * @access      Public
 */
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.send(product);
  }

  res.status(404);
  throw new Error('Resource not found');
});

export { getProducts, getProductById };
