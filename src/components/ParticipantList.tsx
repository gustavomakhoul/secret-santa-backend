import React from 'react';
import { X } from 'lucide-react';
import type { Participant } from '../types';

interface ParticipantListProps {
  participants: Participant[];
  onRemove: (id: string) => void;
}

export function ParticipantList({ participants, onRemove }: ParticipantListProps) {
  return (
    <div className="space-y-2 mb-6">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
        >
          <div>
            <p className="font-medium">{participant.name}</p>
            <p className="text-sm text-gray-600">{participant.email}</p>
          </div>
          <button
            onClick={() => onRemove(participant.id)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}