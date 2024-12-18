import { API_ENDPOINTS, ERROR_MESSAGES } from '../config';
import type { SecretSantaPair } from '../types';

export async function makeApiRequest<T>(
  endpoint: string,
  options: RequestInit
): Promise<T> {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    throw new Error(ERROR_MESSAGES.MISSING_API_URL);
  }

  const response = await fetch(`${apiUrl}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 
      data.details || 
      `Request failed with status: ${response.status}`
    );
  }

  return data;
}

export async function sendSecretSantaRequest(pair: SecretSantaPair) {
  return makeApiRequest<{ success: boolean }>(API_ENDPOINTS.SEND_SECRET_SANTA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pair }),
  });
}