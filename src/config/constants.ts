// API Constants
export const API_ENDPOINTS = {
  SEND_SECRET_SANTA: '/api/send-secret-santa',
  HEALTH_CHECK: '/health',
} as const;

// Email Constants
export const EMAIL_CONSTANTS = {
  FROM_ADDRESS: 'Amigo Secreto <onboarding@resend.dev>',
  SUBJECT: '🎄 Seu Amigo Secreto foi sorteado!',
} as const;

// Validation Constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INCOMPLETE_DATA: 'Dados do participante incompletos',
  MISSING_API_URL: 'API URL não configurada',
  RATE_LIMIT: 'Muitas tentativas de envio. Por favor, aguarde alguns minutos antes de tentar novamente.',
  CONNECTION_ERROR: 'Não foi possível conectar ao servidor. Por favor, verifique sua conexão e tente novamente.',
  UNEXPECTED_ERROR: 'Erro inesperado ao enviar email',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
  RATE_LIMIT: 429,
} as const;