/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRouter from './routes/productRoutes';
import userRouter from './routes/userRoutes';
import orderRouter from './routes/ordersRoutes';
import { errorHandler, noFound } from './moddleware/errorMiddleware';
import { connectDB } from '@mern-proshop/database';

const app = express();

// connectDB();
connectDB(process.env.MONGO_URI);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (_, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(noFound);
app.use(errorHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
