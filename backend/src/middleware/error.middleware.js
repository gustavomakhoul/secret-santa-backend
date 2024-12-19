import { AppError } from '../utils/errors.js';
import { HTTP_STATUS } from '../config/constants.js';
import { serverConfig } from '../config/server.config.js';

export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Handle CORS errors
  if (err.message.includes('CORS')) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      error: 'CORS Error',
      message: 'Origin not allowed',
      allowedOrigins: serverConfig.corsOrigins
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: serverConfig.environment === 'development' ? err.details : undefined
    });
  }

  // Handle unexpected errors
  return res.status(HTTP_STATUS.SERVER_ERROR).json({
    error: 'Internal Server Error',
    message: serverConfig.environment === 'development' ? err.message : undefined
  });
}