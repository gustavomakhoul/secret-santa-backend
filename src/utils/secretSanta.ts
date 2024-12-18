import type { Participant, SecretSantaPair } from '../types';

export function shuffleParticipants(participants: Participant[]): SecretSantaPair[] {
  if (participants.length < 3) {
    throw new Error('É necessário pelo menos 3 participantes para realizar o sorteio');
  }

  const shuffled = [...participants];
  let currentIndex = shuffled.length;
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    // Fisher-Yates shuffle
    currentIndex = shuffled.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ];
    }

    // Check if no one got themselves
    let isValid = true;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].id === shuffled[i].id) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      // Create pairs
      const pairs: SecretSantaPair[] = [];
      for (let i = 0; i < participants.length; i++) {
        const giver = participants[i];
        const receiver = shuffled[i];
        pairs.push({ giver, receiver });
      }
      return pairs;
    }

    attempts++;
  }

  throw new Error('Não foi possível gerar um sorteio válido. Tente novamente.');
}