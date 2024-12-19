import dotenv from 'dotenv';
import app from './app.js';
import { serverConfig } from './config/server.config.js';

// Load environment variables
dotenv.config();

// Start server
app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
  console.log(`Environment: ${serverConfig.environment}`);
});