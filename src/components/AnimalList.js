import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({ name: '', species: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener todos los animales asociados a un zoológico por default
    const fetchAnimals = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('https://taller-api-restful-izu0.onrender.com/api/animals/zoo/{zooId}', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnimals(response.data);
      } catch (err) {
        console.error("Error al obtener la lista de animales:", err);
        setError('Error al cargar los animales. Asegúrate de que estás autenticado.');
      }
    };

    fetchAnimals();
  }, []);

  const handleCreateAnimal = async () => {
    if (!newAnimal.name || !newAnimal.species) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post('https://taller-api-restful-izu0.onrender.com/api/animals', newAnimal, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setAnimals([...animals, response.data]); // Agregar el nuevo animal a la lista
      setNewAnimal({ name: '', species: '' }); // Limpiar los campos del formulario
    } catch (err) {
      console.error("Error al crear un animal:", err);
    }
  };

  const handleUpdateAnimal = async (id, updatedAnimal) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(`https://taller-api-restful-izu0.onrender.com/api/animals/${id}`, updatedAnimal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnimals(animals.map((animal) => (animal._id === id ? response.data : animal))); // Actualizar el animal en la lista
    } catch (err) {
      console.error("Error al actualizar el animal:", err);
    }
  };

  const handleDeleteAnimal = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`https://taller-api-restful-izu0.onrender.com/api/animals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnimals(animals.filter((animal) => animal._id !== id)); // Eliminar el animal de la lista
    } catch (err) {
      console.error("Error al eliminar el animal:", err);
    }
  };

  return (
    <div>
      <h1>Lista de Animales</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Formulario para crear un nuevo animal */}
      <div>
        <h2>Crear un nuevo animal</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newAnimal.name}
          onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Especie"
          value={newAnimal.species}
          onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })}
        />
        <button onClick={handleCreateAnimal}>Crear Animal</button>
      </div>

      {/* Tabla que muestra todos los animales */}
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal._id}>
              <td>{animal.name}</td>
              <td>{animal.species}</td>
              <td>
                <button onClick={() => handleUpdateAnimal(animal._id, { name: animal.name, species: animal.species })}>
                  Actualizar
                </button>
                <button onClick={() => handleDeleteAnimal(animal._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalList;
