import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import necesario para Chart.js
import { Button } from 'primereact/button'; // Botón de PrimeReact
import { Card } from 'primereact/card'; // Tarjeta de PrimeReact
import { Link } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilos principales de PrimeReact
import 'primeicons/primeicons.css'; // Iconos de PrimeReact

const ZooDashboard = ({ zoos }) => {
    console.log("Datos pasados al Dashboard:", zoos);

    if (!zoos || !Array.isArray(zoos)) {
        return <p>Cargando datos...</p>;
    }

    // Total de zoológicos
    const totalZoos = zoos.length;

    // Total de animales en todos los zoológicos
    const totalAnimals = zoos.reduce((acc, zoo) => acc + (zoo.animals?.length || 0), 0);

    // Datos para el gráfico de barras: Nombre del Zoológico y la Cantidad de Animales en cada uno
    const zooNames = zoos.map(zoo => zoo.name);
    const animalCounts = zoos.map(zoo => zoo.animals?.length || 0);

    // Configuración para el gráfico de barras
    const barData = {
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

    const barOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Calcular el número de especies de animales por zoológico
    const speciesCount = {};

    zoos.forEach(zoo => {
        zoo.animals.forEach(animal => {
            speciesCount[animal.species] = (speciesCount[animal.species] || 0) + 1;
        });
    });

    const speciesLabels = Object.keys(speciesCount);
    const speciesData = Object.values(speciesCount);

    const pieData = {
        labels: speciesLabels,
        datasets: [
            {
                label: 'Porcentaje de Especies de Animales',
                data: speciesData,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="p-mt-5">
            <Card title="Dashboard de Zoológicos" className="p-mb-4">
                <Link to="/zoos">
                    <Button label="Atrás" icon="pi pi-arrow-left" className="p-button-secondary p-mb-3" />
                </Link>
                <p>Total de Zoológicos: {totalZoos}</p>
                <p>Total de Animales: {totalAnimals}</p>
            </Card>

            {/* Gráfico de barras */}
            <Card className="p-mb-4">
                <h3>Cantidad de Animales por Zoológico</h3>
                <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
                    <Bar data={barData} options={barOptions} />
                </div>
            </Card>

            {/* Gráfico de torta */}
            <Card className="p-mb-4">
                <h3>Porcentaje de Especies de Animales</h3>
                <div style={{ width: '50%', margin: '0 auto' }}>
                    <Pie data={pieData} />
                </div>
            </Card>
        </div>
    );
};

export default ZooDashboard;
