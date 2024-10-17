import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ZooDashboard from './ZooDashboard'; // Importa el nuevo componente
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom'; 

const Dashboard = () => {
  const [zoos, setZoos] = useState([]);

  useEffect(() => {
    const fetchZoos = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('https://taller-api-restful.onrender.com/api/zoos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setZoos(response.data);
      } catch (err) {
        console.error("Error al obtener la lista de zoológicos:", err);
      }
    };

    fetchZoos();
  }, []);

  return (
    <div>
      <h1>Lista de Zoológicos</h1>
      {/* Renderiza el Dashboard con las estadísticas */}
      {zoos.length > 0 && <ZooDashboard zoos={zoos} />}

      <Link to="/zoos" className="btn btn-primary mb-3">atras</Link>
      
      {/* Aquí va tu tabla o la lógica actual para mostrar los zoológicos */}
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Animales</th>
          </tr>
        </thead>
        <tbody>
          {zoos.map((zoo) => (
            <tr key={zoo._id}>
              <td>{zoo._id}</td>
              <td>{zoo.name}</td>
              <td>{zoo.location}</td>
              <td>
                <ul>
                  {zoo.animals.map((animal, index) => (
                    <li key={index}>{animal.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
