import { AppError } from '../utils/errors.js';

export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Handle CORS errors specifically
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      error: 'CORS Error',
      message: 'Not allowed by CORS'
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.details : undefined
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    error: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}