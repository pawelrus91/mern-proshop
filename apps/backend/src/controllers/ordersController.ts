import asyncHandler from '../moddleware/asyncHandler';

import { Order } from '@mern-proshop/database';
import { NewOrder } from '@mern-proshop/types';
import type { Request, Response } from 'express';

/**
 * @description Create new order
 * @route       POST /api/orders
 * @access      Private
 */
const addOrderItems = asyncHandler(
  async (
    req: Request<Record<string, string>, undefined, NewOrder>,
    res: Response
  ) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems: orderItems.map((item) => ({
          ...item,
          product: item.product,
          _id: undefined,
        })),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        user: req.user?._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  }
);

/**
 * @description Get logged in user order
 * @route       GET /api/orders/mine
 * @access      Private/Admin
 */
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user: req.user?._id,
  });

  res.status(200).json(orders);
});

/**
 * @description Get logged in user order
 * @route       GET /api/orders/myorders
 * @access      Private/Admin
 */
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @description Update order to paid
 * @route       GET /api/orders/:id/paid
 * @access      Private/Admin
 */
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  res.send('update order to paid');
});

/**
 * @description Update order to delivered
 * @route       GET /api/orders/:id/deliver
 * @access      Private/Admin
 */
const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('update order to delivered');
  }
);

/**
 * @description Get all orders
 * @route       GET /api/orders
 * @access      Private/Admin
 */
const getOrders = asyncHandler(async (req: Request, res: Response) => {
  res.send('get all orders');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
