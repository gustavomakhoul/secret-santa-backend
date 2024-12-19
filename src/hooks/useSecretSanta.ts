import { useState } from 'react';
import type { Participant } from '../types';
import { shuffleParticipants } from '../utils/secretSanta';
import { sendEmail } from '../utils/email';
import { validateParticipants } from '../utils/validation';

export function useSecretSanta(participants: Participant[]) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDraw = async () => {
    const validationError = validateParticipants(participants);
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const pairs = shuffleParticipants(participants);
      await Promise.all(pairs.map(sendEmail));
      
      setMessage('🎉 Sorteio realizado! Os participantes receberão seus amigos secretos por email.');
      return true;
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Erro ao realizar o sorteio. Tente novamente.');
      return false;
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