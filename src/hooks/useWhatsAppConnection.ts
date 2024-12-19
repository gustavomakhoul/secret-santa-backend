import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export function useWhatsAppConnection() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000');

    newSocket.on('connect', () => {
      setConnectionStatus('connecting');
      setError(null);
    });

    newSocket.on('qr', (qr: string) => {
      setQRCode(qr);
    });

    newSocket.on('ready', () => {
      setConnectionStatus('connected');
      setQRCode(null);
    });

    newSocket.on('disconnected', () => {
      setConnectionStatus('disconnected');
      setQRCode(null);
    });

    newSocket.on('error', (err: string) => {
      setError(err);
      setConnectionStatus('disconnected');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return {
    socket,
    qrCode,
    connectionStatus,
    error
  };
}