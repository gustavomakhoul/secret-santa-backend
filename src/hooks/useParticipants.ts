import { useState } from 'react';
import type { Participant } from '../types';
import { validateParticipant } from '../utils/validation';

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = (participant: Participant): string | null => {
    const validationError = validateParticipant(participant);
    if (validationError) {
      return validationError;
    }

    const emailExists = participants.some(p => p.email === participant.email);
    if (emailExists) {
      return 'Este email já está cadastrado';
    }

    setParticipants(prev => [...prev, participant]);
    return null;
  };

  const removeParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };

  return {
    participants,
    addParticipant,
    removeParticipant,
  };
}