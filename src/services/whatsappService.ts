import { Participant, DrawResult } from '../types';
import { createSecretSantaMessage } from '../utils/messages';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000');

export async function sendDrawResults(results: DrawResult[], participants: Participant[]) {
  const getParticipant = (id: string) => participants.find(p => p.id === id);

  for (const result of results) {
    const giver = getParticipant(result.giver);
    const receiver = getParticipant(result.receiver);

    if (!giver || !receiver || !giver.whatsapp) continue;

    const message = createSecretSantaMessage(giver.name, receiver.name);
    
    try {
      await new Promise((resolve, reject) => {
        socket.emit('sendMessage', {
          to: giver.whatsapp,
          message: message
        }, (response: { success: boolean; error?: string }) => {
          if (response.success) {
            resolve(response);
          } else {
            reject(new Error(response.error || 'Failed to send message'));
          }
        });
      });
    } catch (error) {
      console.error(`Failed to send message to ${giver.name}:`, error);
      throw error;
    }
  }
}