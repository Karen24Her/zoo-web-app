import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ZooDashboard from './ZooDashboard';


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
        {zoos.length > 0 && <ZooDashboard zoos={zoos} />}
      </div>
  );
};

export default Dashboard;
