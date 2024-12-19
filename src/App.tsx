import React from 'react';
import { Gift } from 'lucide-react';
import { AddParticipantForm } from './components/AddParticipantForm';
import { ParticipantList } from './components/ParticipantList';
import { ResultModal } from './components/ResultModal';
import { WhatsAppQRCode } from './components/WhatsAppQRCode';
import { useParticipants } from './hooks/useParticipants';
import { useDraw } from './hooks/useDraw';
import { useWhatsAppConnection } from './hooks/useWhatsAppConnection';

export function App() {
  const {
    participants,
    addParticipant,
    removeParticipant
  } = useParticipants();

  const {
    results,
    showResults,
    isProcessing,
    handleDraw,
    closeResults
  } = useDraw(participants);

  const { connectionStatus } = useWhatsAppConnection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-green-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Gift size={48} className="text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Amigo Secreto
          </h1>
          <p className="text-gray-600">
            Organize seu amigo secreto de forma fácil e divertida!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <WhatsAppQRCode />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <AddParticipantForm onAdd={addParticipant} />

          <ParticipantList
            participants={participants}
            onRemove={removeParticipant}
          />

          {participants.length > 0 && (
            <div className="mt-6">
              <button
                onClick={handleDraw}
                disabled={isProcessing || connectionStatus !== 'connected'}
                className={`w-full px-4 py-3 rounded-lg font-semibold text-white transition-colors ${
                  isProcessing || connectionStatus !== 'connected'
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isProcessing ? 'Enviando mensagens...' : 'Realizar Sorteio'}
              </button>
              {connectionStatus !== 'connected' && (
                <p className="text-sm text-red-600 mt-2 text-center">
                  Conecte o WhatsApp Business para realizar o sorteio
                </p>
              )}
            </div>
          )}
        </div>

        <ResultModal
          isOpen={showResults}
          onClose={closeResults}
          results={results}
          participants={participants}
        />
      </div>
    </div>
  );
}

export default App;