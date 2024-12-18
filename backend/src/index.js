import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { emailRouter } from './routes/emailRoutes.js';
import { healthRouter } from './routes/healthRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://courageous-horse-5119ed.netlify.app'
];

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Pre-flight requests
app.options('*', cors());

// Routes
app.use('/api', emailRouter);
app.use('/', healthRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Allowed origins:', allowedOrigins);
});