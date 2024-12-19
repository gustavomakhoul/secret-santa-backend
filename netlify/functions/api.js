import { Resend } from 'resend';
import { EMAIL_CONSTANTS } from '../../src/config/email.constants.js';
import { generateSecretSantaEmail } from '../../src/templates/secretSanta.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event, context) {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { pair } = JSON.parse(event.body);

    if (!pair?.giver?.email || !pair?.receiver?.name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request data' }),
      };
    }

    const response = await resend.emails.send({
      from: EMAIL_CONSTANTS.FROM_ADDRESS,
      to: pair.giver.email,
      subject: EMAIL_CONSTANTS.SUBJECT,
      html: generateSecretSantaEmail(pair.giver, pair.receiver),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: response.id }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
}