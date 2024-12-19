import { useState } from 'react';
import type { Participant } from '../types';

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = ({ name, email }: Omit<Participant, 'id'>) => {
    setParticipants([...participants, { 
      id: Date.now().toString(), 
      name, 
      email 
    }]);
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