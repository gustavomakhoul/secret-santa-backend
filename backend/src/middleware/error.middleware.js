import { AppError } from '../utils/errors.js';
import { serverConfig } from '../config/index.js';

export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: serverConfig.environment === 'development' ? err.details : undefined
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    error: 'Internal Server Error',
    details: serverConfig.environment === 'development' ? err.message : undefined
  });
}