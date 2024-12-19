import { Request, Response, NextFunction } from 'express';
import { WhatsAppError } from '../whatsapp/errors/WhatsAppError.js';
import { logger } from '../utils/logger.js';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error('Error occurred:', error);

  if (error instanceof WhatsAppError) {
    res.status(400).json({
      error: 'WhatsApp Error',
      message: error.message
    });
    return;
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message
  });
}