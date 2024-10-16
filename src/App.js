// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ZooList from './components/ZooList';
import ZooDetail from './components/ZooDetail';
import CreateZoo from './components/CreateZoo';
import CreateAnimal from './components/CreateAnimal';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/zoos" element={<ZooList />} />
        <Route path="/zoo/:id" element={<ZooDetail />} />
        <Route path="/create-zoo" element={<CreateZoo />} />
        <Route path="/create-animal" element={<CreateAnimal />} />
      </Routes>
    </Router>
  );
}

export const Dashboard = () => { // Cambiamos este export a un 'named export'
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/create-zoo">Crear Zoológico</Link>
      <Link to="/create-animal">Crear Animal</Link>
    </div>
  );
};

export default App; // Solo App tiene 'default export'
