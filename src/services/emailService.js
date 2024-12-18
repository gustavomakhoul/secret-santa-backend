import { Resend } from 'resend';
import { generateSecretSantaEmail } from '../templates/secretSanta.js';

const FROM_ADDRESS = 'Amigo Secreto <onboarding@resend.dev>';
const SUBJECT = '🎄 Seu Amigo Secreto foi sorteado!';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(giver, receiver) {
  try {
    const response = await resend.emails.send({
      from: FROM_ADDRESS,
      to: giver.email,
      subject: SUBJECT,
      html: generateSecretSantaEmail(giver, receiver),
    });

    if (!response?.id) {
      throw new Error('Failed to send email - no response ID');
    }

    return response;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}