import { config } from '../config/environment.js';

export function handleEmailError(error) {
  console.error('Error sending email:', error);
  
  const errorMapping = {
    429: {
      statusCode: 429,
      message: 'Rate limit exceeded'
    },
    401: {
      statusCode: 401,
      message: 'Invalid API key'
    },
    403: {
      statusCode: 401,
      message: 'Invalid API key'
    }
  };

  const defaultError = {
    statusCode: 500,
    message: 'Failed to send email'
  };

  const { statusCode, message } = errorMapping[error.statusCode] || defaultError;
  
  return {
    statusCode,
    errorResponse: {
      error: message,
      details: config.environment === 'development' ? error.message : undefined
    }
  };
}