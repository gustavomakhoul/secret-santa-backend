import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import { corsConfig } from './config/cors.config.js';
import { securityMiddleware } from './middleware/security.middleware.js';

const app = express();

// CORS configuration
app.use(cors(corsConfig));

// Handle preflight requests
app.options('*', cors(corsConfig));

// Security headers
app.use(securityMiddleware);

// Body parser
app.use(express.json());

// Routes
app.use('/api', apiRouter);
app.use('/', healthRouter);

// Error handling
app.use(errorHandler);

export default app;