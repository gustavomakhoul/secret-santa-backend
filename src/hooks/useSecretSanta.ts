import { useState } from 'react';
import type { Participant } from '../types';
import { shuffleParticipants } from '../utils/secretSanta';
import { sendEmail } from '../utils/email';

export function useSecretSanta(participants: Participant[]) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDraw = async () => {
    if (participants.length < 3) {
      setMessage('Adicione pelo menos 3 participantes!');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const pairs = shuffleParticipants(participants);
      for (const pair of pairs) {
    await sendEmail(pair)
}
      
      setMessage('🎉 Sorteio realizado! Os participantes receberão seus amigos secretos por email.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Erro ao realizar o sorteio. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    message,
    handleDraw
  };
}