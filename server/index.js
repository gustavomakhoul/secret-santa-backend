import express from 'express';
import { environment } from './config/environment.js';
import { corsMiddleware } from './middleware/cors.js';
import emailRoutes from './routes/emailRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api', emailRoutes);
app.use('/', healthRoutes);

app.listen(environment.port, () => {
  console.log(`Server running on port ${environment.port}`);
  console.log(`Environment: ${environment.nodeEnv}`);
});