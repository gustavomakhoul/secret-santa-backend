import type { Participant } from '../types';

export const validateParticipants = (participants: Participant[]): string | null => {
  if (participants.length < 3) {
    return 'Adicione pelo menos 3 participantes!';
  }

  const emails = new Set(participants.map(p => p.email));
  if (emails.size !== participants.length) {
    return 'Existem emails duplicados na lista!';
  }

  return null;
};