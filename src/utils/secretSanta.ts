export function shuffleParticipants(participants: Participant[]): SecretSantaPair[] {
  const shuffled = [...participants];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const pairs: SecretSantaPair[] = [];
  for (let i = 0; i < shuffled.length; i++) {
    pairs.push({
      giver: shuffled[i],
      receiver: shuffled[(i + 1) % shuffled.length]
    });
  }

  return pairs;
}