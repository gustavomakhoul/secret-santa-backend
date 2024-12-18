import { VALIDATION } from '../config/constants.js';

export function isValidEmail(email) {
  return VALIDATION.EMAIL_REGEX.test(email);
}

export function isValidParticipant(participant) {
  return participant && 
         typeof participant.name === 'string' && 
         participant.name.trim().length > 0 &&
         typeof participant.email === 'string' &&
         isValidEmail(participant.email);
}

export function isValidPair(pair) {
  return pair &&
         isValidParticipant(pair.giver) &&
         isValidParticipant(pair.receiver);
}