import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { environment } from './config/environment.js';
import { corsConfig } from './config/corsConfig.js';
import { setupSocketIO } from './socket/socketSetup.js';
import { setupWhatsAppClient } from './whatsapp/whatsappClient.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors(corsConfig));
app.use(express.json());

// Initialize WhatsApp client
const whatsappClient = setupWhatsAppClient();

// Setup Socket.IO with WhatsApp client
setupSocketIO(httpServer, whatsappClient);

// Error handling
app.use(errorHandler);

httpServer.listen(environment.port, () => {
  logger.info(`Server running on port ${environment.port}`);
});