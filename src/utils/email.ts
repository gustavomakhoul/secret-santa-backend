import { Resend } from 'resend';
import type { SecretSantaPair } from '../types';

const resend = new Resend('re_7XCu3Tc8_zvz6hDr2rNqVAtRgFDAX1qJm');

export const generateEmailHtml = (giverName: string, receiverName: string) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #2563eb;">🎁 Amigo Secreto</h1>
    <p>Olá ${giverName}!</p>
    <p>O sorteio do amigo secreto foi realizado e você tirou:</p>
    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #2563eb; margin: 0;">${receiverName}</h2>
    </div>
    <p>Mantenha em segredo e prepare um presente especial! 🎄✨</p>
  </div>
`;

export const sendEmail = async (pair: SecretSantaPair) => {
  // alert(JSON.stringify(pair))
return fetch('https://corsbypass-5jyi.onrender.com/https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer re_8apQEX89_HMwAFgnMUzxfdBbE2hFwvaj5',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
from: 'amigo-secreto@nohca.com',
      to: pair.giver.email,
      subject: '🎄 Seu Amigo Secreto foi sorteado!',
      html: generateEmailHtml(pair.giver.name, pair.receiver.name)
  })
})
  }