import { useState } from 'react';
import { Participant } from '../types';

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = (newParticipant: Omit<Participant, 'id'>) => {
    setParticipants([
      ...participants,
      {
        id: crypto.randomUUID(),
        ...newParticipant
      }
    ]);
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  return {
    participants,
    addParticipant,
    removeParticipant
  };
}