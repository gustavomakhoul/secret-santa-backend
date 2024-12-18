import { useState } from 'react';
import type { Participant, SecretSantaPair } from '../types';
import { shuffleParticipants } from '../utils/secretSanta';
import { sendSecretSantaEmail } from '../services/email';
import toast from 'react-hot-toast';

export function useSecretSanta() {
  const [isDrawing, setIsDrawing] = useState(false);

  const performDraw = async (participants: Participant[]): Promise<void> => {
    if (participants.length < 3) {
      toast.error('É necessário pelo menos 3 participantes para realizar o sorteio');
      return;
    }

    setIsDrawing(true);
    try {
      const pairs = shuffleParticipants(participants);
      
      // Send emails sequentially to avoid rate limits
      for (const pair of pairs) {
        await sendSecretSantaEmail(pair);
        toast.success(`Email enviado para ${pair.giver.name}`);
      }
      
      toast.success('Sorteio realizado com sucesso! Todos os emails foram enviados.');
    } catch (error) {
      console.error('Error during secret santa draw:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Ocorreu um erro ao realizar o sorteio. Tente novamente.'
      );
    } finally {
      setIsDrawing(false);
    }
  };

  return {
    isDrawing,
    performDraw,
  };
}