// eslint-disable-next-line
import mongoose from 'mongoose';
// eslint-disable-next-line
import colors from 'colors';

import { products, users } from '@mern-proshop/data';

import { connectDB, Order, Product, User } from '@mern-proshop/database';

connectDB(process.env.MONGO_URI);

// node backend -d
const insertData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // await Promise.all([Order.deleteMany, Order.deleteMany, User.deleteMany]);

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  insertData();
}
