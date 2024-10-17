import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ZooList = () => {
  const [zoos, setZoos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchZoos = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('https://taller-api-restful.onrender.com/api/zoos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setZoos(response.data); // Asumimos que la respuesta es un array de zoológicos
      } catch (err) {
        console.error("Error al obtener la lista de zoológicos:", err);
        setError('Error al cargar los zoológicos. Asegúrate de que estás autenticado.');
      }
    };

    fetchZoos();
  }, []);

  return (
    <div>
      <h1>Lista de Zoológicos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {zoos.map((zoo) => (
          <li key={zoo._id}>{zoo.name}</li> // Asegúrate de que el campo "name" y "_id" existen
        ))}
      </ul>
    </div>
  );
};

export default ZooList;
