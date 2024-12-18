import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Participant } from '../types';

interface ParticipantListProps {
  participants: Participant[];
  onRemoveParticipant: (id: string) => void;
}

export function ParticipantList({ participants, onRemoveParticipant }: ParticipantListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900">Participantes ({participants.length})</h3>
      <div className="mt-4 divide-y divide-gray-200">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">{participant.name}</p>
              <p className="text-sm text-gray-500">{participant.email}</p>
            </div>
            <button
              onClick={() => onRemoveParticipant(participant.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}