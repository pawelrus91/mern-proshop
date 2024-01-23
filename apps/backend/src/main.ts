/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Response } from 'express';
import * as path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/ordersRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler, noFound } from './moddleware/errorMiddleware';
import { connectDB } from '@mern-proshop/database';
import bodyParser from 'body-parser';

const app = express();

// connectDB();
connectDB(process.env.MONGO_URI);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
const __dirname = path.resolve(); // Set __dirname to current directory

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (_, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // any route that in not api will be redirected to index.html
  app.get('*', (_, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to backend!' });
  });
}

app.use(noFound);
app.use(errorHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
