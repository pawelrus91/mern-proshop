/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
// import connectDB from './config/db';
import productRouter from './routes/productRoutes';
import { errorHandler, noFound } from './moddleware/errorMiddleware';
import { connectDB } from '@mern-proshop/database';

const app = express();

// connectDB();
connectDB(process.env.MONGO_URI);

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.use('/api/products', productRouter);

app.use(noFound);
app.use(errorHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
