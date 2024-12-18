import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { emailRouter } from './routes/emailRoutes.js';
import { healthRouter } from './routes/healthRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration with error handling
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://courageous-horse-5119ed.netlify.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Basic error handler
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

// Routes with error handling
app.use('/api', (req, res, next) => {
  try {
    emailRouter(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use('/', (req, res, next) => {
  try {
    healthRouter(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

// Development server
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Serverless export
export default app;