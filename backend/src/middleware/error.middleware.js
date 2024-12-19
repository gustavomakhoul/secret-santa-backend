import { AppError } from '../utils/errors.js';
import { HTTP_STATUS } from '../config/constants.js';

export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Handle CORS errors
  if (err.message.includes('CORS')) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      error: 'CORS Error',
      message: 'Origin not allowed',
      allowedOrigins: process.env.CORS_ORIGINS?.split(',') || [
        'http://localhost:5173',
        'https://courageous-horse-5119ed.netlify.app'
      ]
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.details : undefined
    });
  }

  // Handle unexpected errors
  return res.status(HTTP_STATUS.SERVER_ERROR).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}