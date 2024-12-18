export function generateSecretSantaEmail(giver, receiver) {
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