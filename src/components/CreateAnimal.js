// src/components/CreateAnimal.js
import React, { useState, useEffect } from 'react';
import { getZoos, createAnimal } from '../services/apiService';

const CreateAnimal = () => {
  const [animalData, setAnimalData] = useState({
    name: '',
    species: '',
    zoo: ''
  });
  const [zoos, setZoos] = useState([]);

  useEffect(() => {
    // Obtener la lista de zoológicos para el dropdown
    getZoos()
      .then(response => {
        setZoos(response.data);
      })
      .catch(error => {
        console.error("Error al obtener zoológicos:", error);
      });
  }, []);

  const handleChange = (e) => {
    setAnimalData({
      ...animalData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llamar a la API para crear el animal
    createAnimal(animalData)
      .then(response => {
        alert("Animal creado exitosamente");
      })
      .catch(error => {
        console.error("Error al crear animal:", error);
      });
  };

  return (
    <div>
      <h1>Crear Animal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={animalData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Especie:</label>
          <input
            type="text"
            name="species"
            value={animalData.species}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Zoológico:</label>
          <select
            name="zoo"
            value={animalData.zoo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un zoológico</option>
            {zoos.map((zoo) => (
              <option key={zoo._id} value={zoo._id}>
                {zoo.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Crear Animal</button>
      </form>
    </div>
  );
};

export default CreateAnimal;
