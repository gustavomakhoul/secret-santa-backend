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

  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || ERROR_MESSAGES.UNEXPECTED_ERROR);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : ERROR_MESSAGES.CONNECTION_ERROR
    );
  }
}

export async function sendSecretSantaRequest(pair: SecretSantaPair) {
  return makeApiRequest<{ success: boolean; messageId: string }>(
    API_ENDPOINTS.SEND_SECRET_SANTA,
    {
      method: 'POST',
      body: JSON.stringify({ pair }),
    }
  );
}