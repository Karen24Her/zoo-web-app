import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import necesario para la funcionalidad de Chart.js
import { Link } from 'react-router-dom';

const ZooDashboard = ({ zoos }) => {
    console.log("Datos pasados al Dashboard:", zoos); // Agrega este log

  // Asegurarse de que los datos de zoos existen antes de intentar acceder a ellos
  if (!zoos || !Array.isArray(zoos)) {
    return <p>Cargando datos...</p>; // Mensaje temporal mientras se cargan los datos
  }

  // Total de zoológicos
  const totalZoos = zoos.length;

  // Total de animales en todos los zoológicos
  const totalAnimals = zoos.reduce((acc, zoo) => acc + (zoo.animals?.length || 0), 0);

  // Datos para el gráfico de barras: Nombre del Zoológico y la Cantidad de Animales en cada uno
  const zooNames = zoos.map(zoo => zoo.name);
  const animalCounts = zoos.map(zoo => zoo.animals?.length || 0);

  // Configuración para el gráfico de barras
  const data = {
    labels: zooNames,
    datasets: [
      {
        label: 'Cantidad de Animales por Zoológico',
        data: animalCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Dashboard de Zoológicos</h2>
      <Link to="/zoos" className="btn btn-primary mb-3">Atras</Link>
      <p>Total de Zoológicos: {totalZoos}</p>
      <p>Total de Animales: {totalAnimals}</p>

      <div style={{ width: '600px', height: '400px', margin: '50px auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ZooDashboard;
