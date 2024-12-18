import express from 'express';
import cors from 'cors';
import { corsConfig } from './config/cors.config.js';
import { errorHandler } from './middleware/error.middleware.js';
import { emailRouter } from './routes/emailRoutes.js';
import { healthRouter } from './routes/healthRoutes.js';

const app = express();

// Middleware
app.use(cors(corsConfig));
app.use(express.json());

// Routes
app.use('/api', emailRouter);
app.use('/', healthRouter);

// Error handling
app.use(errorHandler);

export default app;