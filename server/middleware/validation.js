import { isValidPair } from '../utils/validators.js';
import { HTTP_STATUS } from '../config/constants.js';

export function validateEmailRequest(req, res, next) {
  const { pair } = req.body;

  if (!pair) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: 'Invalid request data',
      details: 'Missing pair data'
    });
  }

  if (!isValidPair(pair)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: 'Invalid request data',
      details: 'Missing or invalid participant information'
    });
  }

  next();
}