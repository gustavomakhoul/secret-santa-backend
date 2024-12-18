import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { emailRouter } from './routes/emailRoutes.js';
import { healthRouter } from './routes/healthRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://courageous-horse-5119ed.netlify.app'
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());

// Pre-flight requests
app.options('*', cors());

// Routes
app.use('/api', emailRouter);
app.use('/', healthRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export for serverless
export default app;