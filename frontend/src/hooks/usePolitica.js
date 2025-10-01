// Hardcoded demo policies for the company
import { useState } from 'react';

const demoPoliticas = [
  {
    id: 1,
    diaHabilitacionTurnos: 'Lunes a Viernes',
    horaInicioTurnos: '08:00',
    horaFinTurnos: '18:00',
  },
  {
    id: 2,
    diaHabilitacionTurnos: 'Sábados',
    horaInicioTurnos: '09:00',
    horaFinTurnos: '13:00',
  },
  {
    id: 3,
    diaHabilitacionTurnos: 'Domingos',
    horaInicioTurnos: 'Cerrado',
    horaFinTurnos: 'Cerrado',
  },
];

const modifyPoliticas = async (data) => {
  // Demo: just show alert, no real update
  alert('Las politicas han sido modificadas (demo)');
};

function usePolitica() {
  const [politicas] = useState(demoPoliticas);
  const [isLoading] = useState(false);
  const [isError] = useState(false);
  const [error] = useState(null);
  return {
    politicas,
    isError,
    error,
    isLoading,
  };
}

export { usePolitica, modifyPoliticas };
