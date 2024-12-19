export interface Participant {
  id: string;
  name: string;
  email: string;
}

export interface SecretSantaPair {
  giver: Participant;
  receiver: Participant;
}