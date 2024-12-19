import React from 'react';
import { Gift } from 'lucide-react';
import { useParticipants } from './hooks/useParticipants';
import { useSecretSanta } from './hooks/useSecretSanta';
import { ParticipantForm } from './components/ParticipantForm';
import { ParticipantList } from './components/ParticipantList';
import { DrawButton } from './components/DrawButton';
import { StatusMessage } from './components/StatusMessage';

export default function App() {
  const { 
    participants, 
    addParticipant, 
    removeParticipant 
  } = useParticipants();

  const {
    loading,
    message,
    handleDraw
  } = useSecretSanta(participants);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Gift className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Amigo Secreto</h1>
          </div>

          <ParticipantForm onAdd={addParticipant} />
          <ParticipantList 
            participants={participants} 
            onRemove={removeParticipant} 
          />

          {participants.length > 0 && (
            <DrawButton 
              onClick={handleDraw} 
              loading={loading} 
            />
          )}

          <StatusMessage message={message} />
        </div>
      </div>
    </div>
  );
}