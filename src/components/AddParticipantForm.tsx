import React, { useState } from 'react';
import { validateWhatsAppNumber, formatWhatsAppNumber } from '../utils/whatsapp';
import { Participant } from '../types';

interface AddParticipantFormProps {
  onAdd: (participant: Omit<Participant, 'id'>) => void;
}

export function AddParticipantForm({ onAdd }: AddParticipantFormProps) {
  const [newName, setNewName] = useState('');
  const [newWhatsapp, setNewWhatsapp] = useState('');
  const [whatsappError, setWhatsappError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      if (!newWhatsapp || !validateWhatsAppNumber(newWhatsapp)) {
        setWhatsappError('Número de WhatsApp é obrigatório. Use o formato: 5511999999999');
        return;
      }

      onAdd({
        name: newName.trim(),
        whatsapp: formatWhatsAppNumber(newWhatsapp.trim())
      });

      setNewName('');
      setNewWhatsapp('');
      setWhatsappError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do participante
          </label>
          <input
            id="name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Digite o nome"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp (com código do país) *
          </label>
          <input
            id="whatsapp"
            type="tel"
            value={newWhatsapp}
            onChange={(e) => {
              setNewWhatsapp(e.target.value);
              setWhatsappError('');
            }}
            placeholder="Ex: 5511999999999"
            required
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              whatsappError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {whatsappError && (
            <p className="text-red-500 text-sm mt-1">{whatsappError}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Adicionar
        </button>
      </div>
    </form>
  );
}