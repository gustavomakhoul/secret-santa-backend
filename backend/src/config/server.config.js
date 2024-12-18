export const serverConfig = {
  port: process.env.PORT || 3001,
  environment: process.env.NODE_ENV || 'development',
  resendApiKey: process.env.RESEND_API_KEY
};