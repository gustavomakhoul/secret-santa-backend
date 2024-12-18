export const EMAIL_CONSTANTS = {
  FROM_ADDRESS: 'Amigo Secreto <onboarding@resend.dev>',
  SUBJECT: '🎄 Seu Amigo Secreto foi sorteado!',
};

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
  RATE_LIMIT: 429,
};