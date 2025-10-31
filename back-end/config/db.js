import 'dotenv/config';
import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Conexão com Banco de dados inicializada!');
  } catch (error) {
    console.error(error);
  }
};
