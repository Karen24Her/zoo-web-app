import React, { useEffect, useState } from 'react';
import { getZooById } from '../services/apiService';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

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
        <Card title={zoo.name} subTitle={`Ubicación: ${zoo.location}`}>
            <h2>Distribución de Especies</h2>
            <Pie data={speciesDistributionData} />
            <Button label="Volver" icon="pi pi-arrow-left" className="p-button-secondary" onClick={() => window.history.back()} />
        </Card>
    );
};

export default ZooDetail;
