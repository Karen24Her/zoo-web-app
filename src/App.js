// src/App.js
import './App.css'; // Importa tus estilos globales
import 'bootstrap/dist/css/bootstrap.min.css'; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ZooList from './components/ZooList';
import ZooDetail from './components/ZooDetail';
import CreateZoo from './components/CreateZoo';
import CreateAnimal from './components/CreateAnimal';
import Register from './components/Register';
import Auth from './components/Auth';  // Importar el nuevo componente de autenticación
import AnimalList from './components/AnimalList';
import Dashboard from './components/Dashboard';
import ZooDashboard from './components/ZooDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/zoos" element={<ZooList />} />
        <Route path="/zoo/:id" element={<ZooDetail />} />
        <Route path="/create-zoo" element={<CreateZoo />} />
        <Route path="/create-animal" element={<CreateAnimal />} />
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} /> {/* Ruta para ingresar el token */}
        <Route path="/AnimalList" element={<AnimalList />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/ZooDashboard' element={<ZooDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
  