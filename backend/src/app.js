import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api.routes.js';
import { healthRouter } from './routes/healthRoutes.js';
import { errorHandler } from './middleware/error.middleware.js';
import { corsConfig } from './config/cors.config.js';

const app = express();

// CORS configuration
app.use(cors(corsConfig));

// Handle preflight requests
app.options('*', cors(corsConfig));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRouter);
app.use('/', healthRouter);

// Error handling
app.use(errorHandler);

export default app;