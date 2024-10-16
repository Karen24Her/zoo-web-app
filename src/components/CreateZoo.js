// src/components/CreateZoo.js
import React, { useState } from 'react';

const CreateZoo = () => {
  const [zooData, setZooData] = useState({
    name: '',
    location: '',
    geoExtension: '',
    animalCapacity: ''
  });

  const handleChange = (e) => {
    setZooData({
      ...zooData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí llamarías a la API para crear el zoológico
    console.log(zooData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Nombre:</label>
        <input
          type="text"
          name="name"
          value={zooData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Ubicación:</label>
        <input
          type="text"
          name="location"
          value={zooData.location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Extensión Geográfica:</label>
        <input
          type="text"
          name="geoExtension"
          value={zooData.geoExtension}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Capacidad de Animales:</label>
        <input
          type="number"
          name="animalCapacity"
          value={zooData.animalCapacity}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Crear Zoológico
      </button>
    </form>
  );
};

export default CreateZoo;
