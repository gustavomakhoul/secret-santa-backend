import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api.routes.js';
import { healthRouter } from './routes/healthRoutes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://courageous-horse-5119ed.netlify.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRouter);
app.use('/', healthRouter);

// Error handling
app.use(errorHandler);

export default app;