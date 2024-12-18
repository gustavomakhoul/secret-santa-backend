import { ValidationError } from '../utils/errors.js';
import { VALIDATION } from '../config/constants.js';

export function validateEmail(email) {
  return VALIDATION.EMAIL_REGEX.test(email);
}

export function validateParticipant(participant) {
  if (!participant?.name?.trim()) {
    throw new ValidationError('Name is required');
  }
  
  if (!participant?.email?.trim()) {
    throw new ValidationError('Email is required');
  }
  
  if (!validateEmail(participant.email)) {
    throw new ValidationError('Invalid email format');
  }
}

export function validateSecretSantaPair(req, res, next) {
  try {
    const { pair } = req.body;
    
    if (!pair) {
      throw new ValidationError('Pair data is required');
    }

    validateParticipant(pair.giver);
    validateParticipant(pair.receiver);
    
    next();
  } catch (error) {
    next(error);
  }
}