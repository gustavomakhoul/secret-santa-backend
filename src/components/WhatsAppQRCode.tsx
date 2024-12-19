import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useWhatsAppConnection } from '../hooks/useWhatsAppConnection';

export function WhatsAppQRCode() {
  const { qrCode, connectionStatus, error } = useWhatsAppConnection();

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (connectionStatus === 'connected') {
    return (
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <p className="text-green-600">WhatsApp Business conectado!</p>
      </div>
    );
  }

  if (!qrCode) {
    return (
      <div className="text-center p-4">
        <p>Aguardando QR Code...</p>
      </div>
    );
  }

  return (
    <div className="text-center p-4">
      <h3 className="text-lg font-semibold mb-4">Conecte o WhatsApp Business</h3>
      <div className="inline-block p-4 bg-white rounded-lg shadow-md">
        <QRCodeSVG value={qrCode} size={256} />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Escaneie o QR Code com o WhatsApp Business para conectar
      </p>
    </div>
  );
}