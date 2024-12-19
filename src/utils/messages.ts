export function createSecretSantaMessage(giverName: string, receiverName: string): string {
  return `🎄 Amigo Secreto 2024 🎁\n\n` +
    `Olá ${giverName}!\n\n` +
    `Você vai presentear: ${receiverName}\n\n` +
    `💝 Sugestões:\n` +
    `- Valor sugerido: R$ 50-100\n` +
    `- Data da troca: 24 de Dezembro\n` +
    `- Local: Casa da Família\n\n` +
    `Mantenha em segredo! 🤫`;
}