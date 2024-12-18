export const API_ENDPOINTS = {
  SEND_SECRET_SANTA: '/api/send-secret-santa',
  HEALTH_CHECK: '/health',
} as const;

export const ERROR_MESSAGES = {
  INCOMPLETE_DATA: 'Dados do participante incompletos',
  MISSING_API_URL: 'API URL não configurada',
  RATE_LIMIT: 'Muitas tentativas de envio. Por favor, aguarde alguns minutos antes de tentar novamente.',
  CONNECTION_ERROR: 'Não foi possível conectar ao servidor. Por favor, verifique sua conexão e tente novamente.',
  UNEXPECTED_ERROR: 'Erro inesperado ao enviar email',
} as const;