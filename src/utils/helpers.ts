export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const validateParticipants = (participants: any[]): string | null => {
  if (participants.length < 2) {
    return 'É necessário pelo menos 2 participantes para realizar o sorteio!';
  }

  const missingWhatsapp = participants.find(p => !p.whatsapp);
  if (missingWhatsapp) {
    return `${missingWhatsapp.name} não possui número de WhatsApp cadastrado!`;
  }

  return null;
};