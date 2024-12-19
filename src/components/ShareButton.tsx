import React from 'react';
import { Share2, MessageCircle } from 'lucide-react';

interface ShareButtonProps {
  onClick: () => void;
  hasWhatsApp: boolean;
}

export function ShareButton({ onClick, hasWhatsApp }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full"
    >
      {hasWhatsApp ? <MessageCircle size={20} /> : <Share2 size={20} />}
      <span>{hasWhatsApp ? 'Enviar Diretamente' : 'Compartilhar no WhatsApp'}</span>
    </button>
  );
}