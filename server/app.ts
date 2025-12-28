import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

app.use ((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/products', productsRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
