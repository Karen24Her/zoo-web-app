// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ZooList from './components/ZooList';
import ZooDetail from './components/ZooDetail';
import CreateZoo from './components/CreateZoo';
import CreateAnimal from './components/CreateAnimal';
import Register from './components/Register';
import Auth from './components/Auth';  // Importar el nuevo componente de autenticación

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/zoos" element={<ZooList />} />
        <Route path="/zoo/:id" element={<ZooDetail />} />
        <Route path="/create-zoo" element={<CreateZoo />} />
        <Route path="/create-animal" element={<CreateAnimal />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} /> {/* Ruta para ingresar el token */}
      </Routes>
    </Router>
  );
}

export default App;
  