import React from 'react';
import { Gift } from 'lucide-react';
import type { SecretSantaPair } from '../types';

interface DrawResultsProps {
  pairs: SecretSantaPair[];
  onClose: () => void;
}

export function DrawResults({ pairs, onClose }: DrawResultsProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Resultado do Sorteio</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          {pairs.map((pair, index) => (
            <div key={index} className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-red-600" />
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{pair.giver.name}</span> presenteia{' '}
                  <span className="font-medium">{pair.receiver.name}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}