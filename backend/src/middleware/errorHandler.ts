import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message
  });
}