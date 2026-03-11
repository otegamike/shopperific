import express from 'express';
import dotenv from 'dotenv';

// Middleware 
import { connectToDb } from './middleware/connectToDb.js';
import { validateUser } from './middleware/validateUser.js';
import { requireValidation } from './middleware/requireValidation.js';
import { isEmailVerified } from './middleware/isEmailVerified.js';
import cookieParser from 'cookie-parser';

// Routes 
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import shopRoutes from './routes/shops.js'
import verifyEmailRoute from './routes/auth/verifyEmail.js'
import validateRoute from './routes/auth/validate.js'
import sellerRoutes from './routes/seller.js'
import dashboardProductRoutes from './routes/dashboard/products.js'
import dashboardOverviewRoutes from './routes/dashboard/overview.js'
import dashboardShopsRoutes from './routes/dashboard/shops.js'
import dashboardOrdersRoutes from './routes/dashboard/orders.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/orders.js'


import { globalErrorHandler } from './middleware/errorHandler.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Log request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// connect to database
app.use(connectToDb);


// Validate user for all routes below
app.use(validateUser);

// Log in and register routes
app.use('/api/auth', authRoutes);

app.use('/api/auth', validateRoute);

app.use('/api/cart', cartRoutes);

app.use('/api/products', productsRoutes);

app.use('/api/shops', shopRoutes);

app.use(requireValidation);

app.use('/api/orders', orderRoutes);

app.use('/api/verify-email', verifyEmailRoute);

// app.use( isEmailVerified );

app.use('/api/dashboard', dashboardProductRoutes);
app.use('/api/dashboard', dashboardOverviewRoutes);
app.use('/api/dashboard', dashboardOrdersRoutes);
app.use('/api/dashboard', dashboardShopsRoutes);

app.use('/api/sellers', sellerRoutes);



app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
