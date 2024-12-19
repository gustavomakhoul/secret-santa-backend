import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Client } from 'whatsapp-web.js';
import { handleWhatsAppEvents } from '../whatsapp/whatsappEvents.js';
import { handleSocketEvents } from './socketEvents.js';

export function setupSocketIO(httpServer: HTTPServer, whatsappClient: Client) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');
    
    handleWhatsAppEvents(whatsappClient, socket);
    handleSocketEvents(socket, whatsappClient);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
}