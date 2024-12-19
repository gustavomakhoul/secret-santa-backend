export interface Participant {
  id: string;
  name: string;
  whatsapp?: string;
  assignedTo?: string;
}

export interface DrawResult {
  giver: string;
  receiver: string;
}