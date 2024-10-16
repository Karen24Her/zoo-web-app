// src/components/ZooDetail.js
import React, { useEffect, useState } from 'react';
import { getZooById } from '../services/apiService';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';

const ZooDetail = () => {
    const { id } = useParams();
    const [zoo, setZoo] = useState(null);
  
    useEffect(() => {
      getZooById(id)
        .then(response => {
          setZoo(response.data);
        })
        .catch(error => {
          console.error("Error al obtener el zoológico:", error);
        });
    }, [id]);
  
    if (!zoo) return <div>Cargando...</div>;
  
    const speciesDistributionData = {
      labels: Object.keys(zoo.speciesDistribution),
      datasets: [
        {
          label: 'Distribución de Especies',
          data: Object.values(zoo.speciesDistribution),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  
    return (
      <div>
        <h1>{zoo.name}</h1>
        <p>Ubicación: {zoo.location}</p>
        <p>Capacidad de animales: {zoo.animalCapacity}</p>
  
        <h2>Distribución de Especies</h2>
        <Pie data={speciesDistributionData} />
  
        <h2>Animales</h2>
        <ul>
          {zoo.animals.map((animal, index) => (
            <li key={index}>{animal}</li>
          ))}
        </ul>
      </div>
    );
  };

export default ZooDetail;


