// src/services/apiService.js
import axios from 'axios';

const API_URL = 'https://taller-api-restful.onrender.com/api'; // Asegúrate de que la URL sea correcta

// Función para obtener el token JWT almacenado
const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

// Configurar axios para que envíe el token JWT en el encabezado de las solicitudes
axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getZoos = () => {
  return axios.get(`${API_URL}/zoos`);
};

export const getZooById = (id) => {
  return axios.get(`${API_URL}/zoos/${id}`);
};

export const createZoo = (zooData) => {
  return axios.post(`${API_URL}/zoos`, zooData);
};

export const createAnimal = (animalData) => {
  return axios.post(`${API_URL}/animals`, animalData);
};
