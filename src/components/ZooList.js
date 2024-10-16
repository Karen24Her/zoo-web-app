// src/components/ZooList.js
import React, { useEffect, useState } from 'react';
import { getZoos } from '../services/apiService';
import { Link } from 'react-router-dom';

const ZooList = () => {
  const [zoos, setZoos] = useState([]);

  useEffect(() => {
    getZoos()
      .then(response => {
        setZoos(response.data);
      })
      .catch(error => {
        console.error("Error al obtener zoológicos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Zoológicos</h1>
      <ul>
        {zoos.map((zoo) => (
          <li key={zoo._id}>
            <Link to={`/zoo/${zoo._id}`}>{zoo.name}</Link> - Animales: {zoo.animalCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZooList;
