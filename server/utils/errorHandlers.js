import { environment } from '../config/environment.js';
import { HTTP_STATUS } from '../config/constants.js';

export function handleEmailError(error) {
  console.error('Error sending email:', error);
  
  const errorMapping = {
    [HTTP_STATUS.RATE_LIMIT]: {
      statusCode: HTTP_STATUS.RATE_LIMIT,
      message: 'Rate limit exceeded'
    },
    [HTTP_STATUS.UNAUTHORIZED]: {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: 'Invalid API key'
    },
    [HTTP_STATUS.FORBIDDEN]: {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: 'Invalid API key'
    }
  };

  const defaultError = {
    statusCode: HTTP_STATUS.SERVER_ERROR,
    message: 'Failed to send email'
  };

  const { statusCode, message } = errorMapping[error.statusCode] || defaultError;
  
  return {
    statusCode,
    errorResponse: {
      error: message,
      details: environment.nodeEnv === 'development' ? error.message : undefined
    }
  };
}