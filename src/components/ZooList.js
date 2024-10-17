import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const ZooList = () => {
  const [zoos, setZoos] = useState([]);
  const [error, setError] = useState('');
  const [newZoo, setNewZoo] = useState({ name: '', location: '', animals: [] });
  const [selectedZoo, setSelectedZoo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAnimalModal, setShowAnimalModal] = useState(false);
  const [newAnimal, setNewAnimal] = useState({ name: '', species: '' });
  const [selectedAnimal, setSelectedAnimal] = useState(null); // Para manejar el animal seleccionado
  const [showEditAnimalModal, setShowEditAnimalModal] = useState(false); // Para mostrar la ventana emergente de edición de animales


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
        setError('Error al cargar los zoológicos. Asegúrate de que estás autenticado.');
      }
    };

    fetchZoos();
  }, []);

  const handleCreateZoo = async () => {
    if (!newZoo.name || !newZoo.location) {
      console.error("Los campos de nombre y ubicación son obligatorios.");
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post('https://taller-api-restful.onrender.com/api/zoos', {
        name: newZoo.name,
        location: newZoo.location,
        animals: newZoo.animals,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setZoos([...zoos, response.data]);
      setNewZoo({ name: '', location: '', animals: [] });
    } catch (err) {
      console.error("Error al crear un zoológico:", err);
    }
  };

  const handleUpdateZoo = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(`https://taller-api-restful.onrender.com/api/zoos/${selectedZoo._id}`, selectedZoo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setZoos(zoos.map((zoo) => (zoo._id === selectedZoo._id ? response.data : zoo)));
      setShowModal(false);
    } catch (err) {
      console.error("Error al actualizar el zoológico:", err);
    }
  };

  const handleDeleteZoo = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`https://taller-api-restful.onrender.com/api/zoos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setZoos(zoos.filter((zoo) => zoo._id !== id));
    } catch (err) {
      console.error("Error al eliminar el zoológico:", err);
    }
  };

  const handleAddAnimal = async () => {
    if (!newAnimal.name || !newAnimal.species) {
      console.error("Los campos de nombre y especie son obligatorios.");
      return;
    }
  
    try {
      const token = localStorage.getItem('jwtToken');
  
      // Añadir el nuevo animal a la base de datos
      const animalResponse = await axios.post('https://taller-api-restful.onrender.com/api/animals', {
        name: newAnimal.name,
        species: newAnimal.species,
        zoo: selectedZoo._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const addedAnimal = animalResponse.data;
  
      // Actualizar el zoológico localmente con el nuevo animal
      const updatedZoo = {
        ...selectedZoo,
        animals: [...selectedZoo.animals, addedAnimal], // Agregamos el nuevo animal a la lista de animales
      };
  
      // Actualizar el zoológico en la base de datos
      await axios.put(`https://taller-api-restful.onrender.com/api/zoos/${selectedZoo._id}`, updatedZoo, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Actualizamos la lista de zoológicos en el estado
      setZoos(zoos.map((zoo) => (zoo._id === selectedZoo._id ? updatedZoo : zoo)));
  
      // Resetear el formulario y cerrar el modal
      setShowAnimalModal(false);
      setNewAnimal({ name: '', species: '' });
    } catch (err) {
      console.error("Error al agregar un animal:", err);
    }
  };
  

  const handleDeleteAnimal = async (animalId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`https://taller-api-restful.onrender.com/api/animals/${animalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedZoo = {
        ...selectedZoo,
        animals: selectedZoo.animals.filter((animal) => animal._id !== animalId),
      };
  
      await axios.put(`https://taller-api-restful.onrender.com/api/zoos/${selectedZoo._id}`, updatedZoo, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      setZoos(zoos.map((zoo) => (zoo._id === selectedZoo._id ? updatedZoo : zoo)));
    } catch (err) {
      console.error("Error al eliminar el animal:", err);
    }
  };
  

  const openUpdateModal = (zoo) => {
    setSelectedZoo(zoo);
    setShowModal(true);
  };

  const openAnimalModal = (zoo) => {
    setSelectedZoo(zoo);
    setShowAnimalModal(true);
  };

  return (
    <div>
      <h1>Lista de Zoológicos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Crear un nuevo zoológico</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newZoo.name}
          onChange={(e) => setNewZoo({ ...newZoo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={newZoo.location}
          onChange={(e) => setNewZoo({ ...newZoo, location: e.target.value })}
        />
        <button onClick={handleCreateZoo}>Crear Zoológico</button>
      </div>

      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Animales</th>
            <th>Acciones</th>
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
                {Array.isArray(zoo.animals) && zoo.animals.map((animal, index) => (
                  <li key={index}>
                    {animal.name} 
                    <button onClick={() => handleDeleteAnimal(animal._id)} className="btn btn-link p-0">
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </td>
              <td>
                <button onClick={() => openUpdateModal(zoo)}>Actualizar</button>
                <button onClick={() => handleDeleteZoo(zoo._id)}>Eliminar</button>
                <button onClick={() => openAnimalModal(zoo)}>Animal Asociado</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedZoo && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Zoológico</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={selectedZoo.name}
                    onChange={(e) => setSelectedZoo({ ...selectedZoo, name: e.target.value })}
                  />
                </div>
                <div>
                  <label>Ubicación</label>
                  <input
                    type="text"
                    value={selectedZoo.location}
                    onChange={(e) => setSelectedZoo({ ...selectedZoo, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateZoo}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAnimalModal && selectedZoo && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Animal a {selectedZoo.name}</h5>
                <button type="button" className="close" onClick={() => setShowAnimalModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <label>Nombre del Animal</label>
                  <input
                    type="text"
                    value={newAnimal.name}
                    onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                  />
                </div>
                <div>
                  <label>Especie del Animal</label>
                  <input
                    type="text"
                    value={newAnimal.species}
                    onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAnimalModal(false)}>
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddAnimal}>
                  Guardar Animal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZooList;
