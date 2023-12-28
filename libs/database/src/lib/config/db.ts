import mongoose from 'mongoose';

export const connectDB = async (mongoUri: string) => {
  try {
    console.info(`@@@@ KKK ${mongoUri}`);
    const connection = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};
