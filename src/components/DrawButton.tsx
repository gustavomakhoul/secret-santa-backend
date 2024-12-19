import React from 'react';
import { Send } from 'lucide-react';

interface DrawButtonProps {
  onClick: () => void;
  loading: boolean;
}

export function DrawButton({ onClick, loading }: DrawButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
    >
      <Send className="w-4 h-4" />
      {loading ? 'Realizando sorteio...' : 'Realizar Sorteio'}
    </button>
  );
}