import React from 'react';
import { Gift, X } from 'lucide-react';
import { Participant, DrawResult } from '../types';
import { ShareButton } from './ShareButton';
import { generateWhatsAppMessage, generateDirectWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: DrawResult[];
  participants: Participant[];
}

export function ResultModal({ isOpen, onClose, results, participants }: ResultModalProps) {
  if (!isOpen) return null;

  const getParticipant = (id: string): Participant | undefined => {
    return participants.find(p => p.id === id);
  };

  const handleShare = (giverId: string, receiverId: string) => {
    const giver = getParticipant(giverId);
    const receiver = getParticipant(receiverId);
    
    if (!giver || !receiver) return;

    const whatsappUrl = giver.whatsapp 
      ? generateDirectWhatsAppMessage(giver, receiver.name)
      : generateWhatsAppMessage(giver.name, receiver.name);
    
    openWhatsApp(whatsappUrl);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Resultado do Sorteio</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          {results.map((result, index) => {
            const giver = getParticipant(result.giver);
            const receiver = getParticipant(result.receiver);
            
            if (!giver || !receiver) return null;

            return (
              <div
                key={index}
                className="p-4 bg-green-50 rounded-lg border border-green-100"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Gift className="text-green-600" size={20} />
                    <p className="text-gray-800">
                      <span className="font-semibold">{giver.name}</span>
                      {' '} presenteia {' '}
                      <span className="font-semibold">{receiver.name}</span>
                    </p>
                  </div>
                  <ShareButton 
                    onClick={() => handleShare(result.giver, result.receiver)}
                    hasWhatsApp={!!giver.whatsapp}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}