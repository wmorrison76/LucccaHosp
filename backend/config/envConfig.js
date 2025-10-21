import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'LUCCCA_ACCESS';
export const NODE_ENV = process.env.NODE_ENV || 'development';
