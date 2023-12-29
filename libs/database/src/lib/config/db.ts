import mongoose from 'mongoose';

export const connectDB = async (mongoUri?: string) => {
  try {
    const connection = await mongoose.connect(
      process.env['MONGO_URI'] || (mongoUri as string)
    );

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};
