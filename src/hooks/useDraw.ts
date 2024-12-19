import { useState } from 'react';
import { Participant, DrawResult } from '../types';
import { drawNames } from '../utils/drawNames';
import { validateParticipants } from '../utils/helpers';
import { sendDrawResults } from '../services/whatsappService';

export function useDraw(participants: Participant[]) {
  const [results, setResults] = useState<DrawResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDraw = async () => {
    const error = validateParticipants(participants);
    if (error) {
      alert(error);
      return;
    }

    setIsProcessing(true);
    try {
      const drawResults = drawNames(participants);
      setResults(drawResults);
      setShowResults(true);
      
      // Send WhatsApp messages automatically
      await sendDrawResults(drawResults, participants);
      alert('Sorteio realizado! As mensagens foram enviadas para todos os participantes via WhatsApp.');
    } catch (error) {
      console.error('Error during draw:', error);
      alert('Ocorreu um erro ao enviar as mensagens. Por favor, tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const closeResults = () => setShowResults(false);

  return {
    results,
    showResults,
    isProcessing,
    handleDraw,
    closeResults
  };
}