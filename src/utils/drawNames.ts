import { Participant, DrawResult } from '../types';

export function drawNames(participants: Participant[]): DrawResult[] {
  const receivers = [...participants];
  const results: DrawResult[] = [];

  participants.forEach((giver) => {
    let availableReceivers = receivers.filter(
      (receiver) => receiver.id !== giver.id && !results.some(r => r.receiver === receiver.id)
    );

    if (availableReceivers.length === 0) {
      // Reset and try again if we get stuck
      return drawNames(participants);
    }

    const randomIndex = Math.floor(Math.random() * availableReceivers.length);
    const receiver = availableReceivers[randomIndex];

    results.push({
      giver: giver.id,
      receiver: receiver.id,
    });
  });

  return results;
}