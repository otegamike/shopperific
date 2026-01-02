import express from 'express';
import dotenv from 'dotenv';

// Middleware 
import { connectToDb } from './middleware/connectToDb.js';
import { validateUser } from './middleware/validateUser.js';
import { isEmailVerified } from './middleware/isEmailVerified.js';
import cookieParser from 'cookie-parser';

// Routes 
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import shopRoutes from './routes/shops.js'
import verifyEmailRoute from  './routes/auth/verifyEmail.js'

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Log request method and URL
app.use ((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// connect to database
app.use( connectToDb );

// Log in and register routes
app.use('/api/auth', authRoutes);

// Validate user for all routes below
app.use( validateUser );

app.use('/api/verify-email', verifyEmailRoute);

app.use( isEmailVerified );

app.use('/api/products', productsRoutes);

app.use('/api/shops', shopRoutes );

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
