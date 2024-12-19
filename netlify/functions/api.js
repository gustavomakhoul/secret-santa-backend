import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function generateSecretSantaEmail(giver, receiver) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #dc2626; text-align: center;">🎁 Amigo Secreto em Família</h1>
      <p style="font-size: 16px; line-height: 1.5;">
        Olá ${giver.name},
      </p>
      <p style="font-size: 16px; line-height: 1.5;">
        O sorteio do amigo secreto foi realizado! Você irá presentear:
      </p>
      <div style="background-color: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <h2 style="color: #dc2626; margin: 0;">${receiver.name}</h2>
      </div>
      <p style="font-size: 16px; line-height: 1.5;">
        Lembre-se: mantenha o segredo até o dia da revelação! 🤫
      </p>
      <p style="font-size: 14px; color: #666; margin-top: 40px; text-align: center;">
        Este é um email automático, por favor não responda.
      </p>
    </div>
  `;
}

export async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { pair } = JSON.parse(event.body);

    if (!pair?.giver?.email || !pair?.receiver?.name || !pair?.giver?.name) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid request data' })
      };
    }

    const response = await resend.emails.send({
      from: 'Amigo Secreto <onboarding@resend.dev>',
      to: pair.giver.email,
      subject: '🎄 Seu Amigo Secreto foi sorteado!',
      html: generateSecretSantaEmail(pair.giver, pair.receiver)
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: true, 
        messageId: response.id 
      })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Failed to send email',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}