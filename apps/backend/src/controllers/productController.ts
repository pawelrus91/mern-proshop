import asyncHandler from '../moddleware/asyncHandler';

import { Product } from '@mern-proshop/database';
import type { Product as TProduct, Review } from '@mern-proshop/types';
import type { Request, Response } from 'express';

/**
 * @description Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(
  async (
    req: Request<
      unknown,
      TProduct[],
      unknown,
      { pageNumber: number; keyword: string }
    >,
    res: Response
  ) => {
    const pageSize = Number(process.env.PAGINATION_LIMIT) ?? 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  }
);

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

/**
 * @description Delete a product
 * @route       Delete /api/products/:id
 * @access      Private/Admin
 */
const deleteProduct = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne({ _id: req.params.id });

      return res.status(200).send({ message: 'Product deleted' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  }
);

/**
 * @description Create a new  review
 * @route       POST /api/products/:id/reviews
 * @access      Private
 */
const createProductReview = asyncHandler(
  async (
    req: Request<{ id: string }, undefined, Pick<Review, 'rating' | 'comment'>>,
    res: Response
  ) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }

      const review = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name: req.user.name,
        rating: Number(rating),
        comment,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).send({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Resource not found');
    }
  }
);

/**
 * @description Get top rated products
 * @route       GET /api/products/top
 * @access      Public
 */
const getTopProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  return res.status(200).send(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
