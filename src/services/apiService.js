// src/services/apiService.js
import axios from 'axios';

const API_URL = 'https://taller-api-restful.onrender.com/api'; // Asegúrate de que la URL de la API sea correcta

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
