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
    mode: 'cors',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
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
      const error = await response.json().catch(() => ({
        message: ERROR_MESSAGES.UNEXPECTED_ERROR
      }));
      throw new Error(error.message || ERROR_MESSAGES.UNEXPECTED_ERROR);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      throw new Error(ERROR_MESSAGES.CONNECTION_ERROR);
    }
    throw error;
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