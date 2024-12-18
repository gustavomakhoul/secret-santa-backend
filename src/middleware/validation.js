const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

function isValidParticipant(participant) {
  return participant && 
         typeof participant.name === 'string' && 
         participant.name.trim().length > 0 &&
         typeof participant.email === 'string' &&
         isValidEmail(participant.email);
}

export function validateEmailRequest(req, res, next) {
  const { pair } = req.body;

  if (!pair) {
    return res.status(400).json({
      error: 'Invalid request data',
      details: 'Missing pair data'
    });
  }

  if (!isValidParticipant(pair.giver) || !isValidParticipant(pair.receiver)) {
    return res.status(400).json({
      error: 'Invalid request data',
      details: 'Missing or invalid participant information'
    });
  }

  next();
}