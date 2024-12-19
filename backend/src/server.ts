import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import { setupSocketIO } from './socket/socketSetup.js';
import { setupWhatsAppClient } from './whatsapp/whatsappClient.js';
import { errorHandler } from './middleware/errorHandler.js';

config();

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Initialize WhatsApp client
const whatsappClient = setupWhatsAppClient();

// Setup Socket.IO with WhatsApp client
setupSocketIO(httpServer, whatsappClient);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});