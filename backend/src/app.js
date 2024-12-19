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
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
  'http://localhost:5173',
  'https://courageous-horse-5119ed.netlify.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(null, false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
}));

// Handle OPTIONS requests explicitly
app.options('*', cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRouter);
app.use('/', healthRouter);

// Error handling
app.use(errorHandler);

export default app;