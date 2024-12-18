import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { emailRouter } from './routes/emailRoutes.js';
import { healthRouter } from './routes/healthRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['POST']
}));
app.use(express.json());

// Routes
app.use('/api', emailRouter);
app.use('/', healthRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});