import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Participant } from '../types';
import toast from 'react-hot-toast';

interface ParticipantFormProps {
  onAddParticipant: (participant: Participant) => string | null;
}

export function ParticipantForm({ onAddParticipant }: ParticipantFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const participant: Participant = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
    };

    const error = onAddParticipant(participant);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success('Participante adicionado com sucesso!');
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Participante
      </button>
    </form>
  );
}