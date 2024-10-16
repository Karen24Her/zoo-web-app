// src/components/ZooList.js
import React, { useState } from 'react';
import CreateZoo from './CreateZoo';
import CreateAnimal from './CreateAnimal';

const ZooList = () => {
  const [showZooModal, setShowZooModal] = useState(false);
  const [showAnimalModal, setShowAnimalModal] = useState(false);

  const handleZooModalClose = () => setShowZooModal(false);
  const handleZooModalShow = () => setShowZooModal(true);

  const handleAnimalModalClose = () => setShowAnimalModal(false);
  const handleAnimalModalShow = () => setShowAnimalModal(true);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Zoológicos</h1>

      {/* Botones estilizados con Tailwind */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleZooModalShow}
        >
          Crear Zoológico
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAnimalModalShow}
        >
          Crear Animal
        </button>
      </div>

      {/* Modal para Crear Zoológico */}
      {showZooModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Crear Zoológico</h2>
            <CreateZoo />
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleZooModalClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para Crear Animal */}
      {showAnimalModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Crear Animal</h2>
            <CreateAnimal />
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAnimalModalClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZooList;
