import express from 'express';
import { config } from './config/environment.js';
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

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.environment}`);
});