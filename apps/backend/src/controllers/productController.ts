import asyncHandler from '../moddleware/asyncHandler';

import { Product } from '@mern-proshop/database';
import { Product as TProduct } from '@mern-proshop/types';
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

/**
 * @description Create a product
 * @route       POST /api/products
 * @access      Private/Admin
 */
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();

  res.status(201).send(createdProduct);
});

/**
 * @description Update a product
 * @route       PUT /api/products/:id
 * @access      Private/Admin
 */
const updateProduct = asyncHandler(
  async (req: Request<{ id: string }, unknown, TProduct>, res: Response) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findByIdAndUpdate(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();

      return res.status(200).send(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  }
);

export { getProducts, getProductById, createProduct, updateProduct };
