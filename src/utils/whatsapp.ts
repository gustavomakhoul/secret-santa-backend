import { Participant } from '../types';
import { createSecretSantaMessage } from './messages';

export function generateWhatsAppMessage(giverName: string, receiverName: string): string {
  const message = encodeURIComponent(createSecretSantaMessage(giverName, receiverName));
  return `https://wa.me/?text=${message}`;
}

export function generateDirectWhatsAppMessage(giver: Participant, receiverName: string): string {
  const formattedNumber = giver.whatsapp?.replace(/\D/g, '');
  const message = encodeURIComponent(createSecretSantaMessage(giver.name, receiverName));
  return `https://wa.me/${formattedNumber}?text=${message}`;
}

export function validateWhatsAppNumber(number: string): boolean {
  const cleanNumber = number.replace(/\D/g, '');
  return /^55\d{10,11}$/.test(cleanNumber);
}

export function formatWhatsAppNumber(number: string): string {
  const cleanNumber = number.replace(/\D/g, '');
  if (!cleanNumber.startsWith('55')) {
    return `55${cleanNumber}`;
  }
  return cleanNumber;
}

export function openWhatsApp(url: string) {
  window.open(url, '_blank');
}