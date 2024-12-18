import React from 'react';
import { Gift } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { ParticipantForm } from './components/ParticipantForm';
import { ParticipantList } from './components/ParticipantList';
import { useParticipants } from './hooks/useParticipants';
import { useSecretSanta } from './hooks/useSecretSanta';

function App() {
  const { participants, addParticipant, removeParticipant } = useParticipants();
  const { isDrawing, performDraw } = useSecretSanta();

  const handleDraw = async () => {
    try {
      await performDraw(participants);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Gift className="mx-auto h-16 w-16 text-red-600" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Amigo Secreto em Família</h1>
          <p className="mt-2 text-lg text-gray-600">
            Organize seu amigo secreto de Natal de forma fácil e divertida!
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <ParticipantForm onAddParticipant={addParticipant} />
          <ParticipantList
            participants={participants}
            onRemoveParticipant={removeParticipant}
          />

          {participants.length > 0 && (
            <div className="mt-8">
              <button
                onClick={handleDraw}
                disabled={isDrawing}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Gift className="mr-2 h-5 w-5" />
                {isDrawing ? 'Realizando Sorteio...' : 'Realizar Sorteio'}
              </button>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Cada participante receberá seu amigo secreto por email
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;