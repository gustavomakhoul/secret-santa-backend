import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRouter } from './routes/api.routes.js';
import { healthRouter } from './routes/healthRoutes.js';
import { errorHandler } from './middleware/error.middleware.js';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://courageous-horse-5119ed.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRouter);
app.use('/', healthRouter);

// Error handling
app.use(errorHandler);

export default app;