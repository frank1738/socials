import mongoose from 'mongoose';

export const connectDb = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('Connection successful'))
    .catch((error) => console.log('Connection failed: ', error));
};
