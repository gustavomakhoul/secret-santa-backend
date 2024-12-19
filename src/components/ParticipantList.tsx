import React from 'react';
import { Trash2, Phone } from 'lucide-react';
import { Participant } from '../types';

interface ParticipantListProps {
  participants: Participant[];
  onRemove: (id: string) => void;
}

export function ParticipantList({ participants, onRemove }: ParticipantListProps) {
  return (
    <div className="space-y-2">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-gray-800">{participant.name}</span>
            {participant.whatsapp && (
              <span className="flex items-center text-sm text-gray-500">
                <Phone size={14} className="mr-1" />
                {participant.whatsapp}
              </span>
            )}
          </div>
          <button
            onClick={() => onRemove(participant.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}