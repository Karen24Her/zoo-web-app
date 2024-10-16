// src/components/CreateZoo.js
import React, { useState } from 'react';
import { createZoo } from '../services/apiService';

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
    // Llamar a la API para crear el zoológico
    createZoo(zooData)
      .then(response => {
        alert("Zoológico creado exitosamente");
      })
      .catch(error => {
        console.error("Error al crear zoológico:", error);
      });
  };

  return (
    <div>
      <h1>Crear Zoológico</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={zooData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ubicación:</label>
          <input
            type="text"
            name="location"
            value={zooData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Extensión Geográfica:</label>
          <input
            type="text"
            name="geoExtension"
            value={zooData.geoExtension}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Capacidad de Animales:</label>
          <input
            type="number"
            name="animalCapacity"
            value={zooData.animalCapacity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Zoológico</button>
      </form>
    </div>
  );
};

export default CreateZoo;
