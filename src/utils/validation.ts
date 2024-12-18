import type { Participant } from '../types';

export function validateParticipant(participant: Participant): string | null {
  if (!participant.name.trim()) {
    return 'O nome é obrigatório';
  }

  if (!participant.email.trim()) {
    return 'O email é obrigatório';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(participant.email)) {
    return 'Email inválido';
  }

  return null;
}