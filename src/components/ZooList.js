import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ZooList = () => {
    const [zoos, setZoos] = useState([]);
    const [newZoo, setNewZoo] = useState({ name: '', location: '', animals: [] });
    const [selectedZoo, setSelectedZoo] = useState(null);
    const [showAddAnimalModal, setShowAddAnimalModal] = useState(false);
    const [showUpdateAnimalModal, setShowUpdateAnimalModal] = useState(false);
    const [newAnimal, setNewAnimal] = useState({ name: '', species: '' });
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [showZooModal, setShowZooModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchZoos = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get('https://taller-api-restful.onrender.com/api/zoos', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setZoos(response.data);
            } catch (err) {
                console.error("Error al obtener la lista de zoológicos:", err);
            }
        };

        fetchZoos();
    }, []);

    // Función para abrir el modal del zoológico seleccionado
    const openZooModal = (zoo) => {
        setSelectedZoo(zoo);
        setShowZooModal(true);
    };

    // Función para eliminar un zoológico
    const handleDeleteZoo = async (id) => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.delete(`https://taller-api-restful.onrender.com/api/zoos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setZoos(zoos.filter((zoo) => zoo._id !== id));
        } catch (err) {
            console.error("Error al eliminar el zoológico:", err);
        }
    };

    // Función para manejar la actualización de un zoológico
    const handleUpdateZoo = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.put(`https://taller-api-restful.onrender.com/api/zoos/${selectedZoo._id}`, selectedZoo, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setZoos(zoos.map((zoo) => (zoo._id === selectedZoo._id ? response.data : zoo)));
            setShowZooModal(false);
        } catch (err) {
            console.error("Error al actualizar el zoológico:", err);
        }
    };

    // Función para crear un nuevo zoológico
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

    // Función para agregar un nuevo animal
    const handleAddAnimal = async () => {
        if (!newAnimal.name || !newAnimal.species) {
            console.error("Los campos de nombre y especie son obligatorios.");
            return;
        }

        try {
            const token = localStorage.getItem('jwtToken');
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
            const updatedZoo = {
                ...selectedZoo,
                animals: [...selectedZoo.animals, addedAnimal],
            };

            setZoos(zoos.map((zoo) => (zoo._id === selectedZoo._id ? updatedZoo : zoo)));
            setShowAddAnimalModal(false);
            setNewAnimal({ name: '', species: '' });
        } catch (err) {
            console.error("Error al agregar un animal:", err);
        }
    };

    const openAddAnimalModal = (zoo) => {
        setSelectedZoo(zoo);
        setNewAnimal({ name: '', species: '' });
        setShowAddAnimalModal(true);
    };

    return (
        <div className="p-5">
            <h1>Lista de Zoológicos</h1>

            <div className="p-grid">
                <div className="p-col-12 p-md-3">
                    <InputText
                        placeholder="Nombre"
                        value={newZoo.name}
                        onChange={(e) => setNewZoo({ ...newZoo, name: e.target.value })}
                        className="p-inputtext-lg p-d-block"
                    />
                </div>
                <div className="p-col-12 p-md-3">
                    <InputText
                        placeholder="Ubicación"
                        value={newZoo.location}
                        onChange={(e) => setNewZoo({ ...newZoo, location: e.target.value })}
                        className="p-inputtext-lg p-d-block"
                    />
                </div>
                <div className="p-col-12 p-md-3">
                    <Button label="Crear Zoológico" icon="pi pi-plus" className="p-button-success p-button-lg" onClick={handleCreateZoo} />
                </div>
                <div className="p-col-12 p-md-3">
                    <Button label="Ir a Dashboard" icon="pi pi-home" className="p-button-secondary p-button-lg" onClick={() => navigate('/dashboard')} />
                </div>
            </div>

            <DataTable value={zoos} responsiveLayout="scroll" className="p-mt-5">
                <Column field="_id" header="ID" />
                <Column field="name" header="Nombre" />
                <Column field="location" header="Ubicación" />
                <Column
                    header="Animales"
                    body={(rowData) => (
                        <ul>
                            {rowData.animals.map((animal, index) => (
                                <li key={index}>
                                    {animal.name}
                                </li>
                            ))}
                        </ul>
                    )}
                />
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <div>
                            <Button label="Actualizar" icon="pi pi-refresh" className="p-button-info p-mr-2" onClick={() => openZooModal(rowData)} />
                            <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger p-mr-2" onClick={() => handleDeleteZoo(rowData._id)} />
                            <Button label="Agregar Animal" icon="pi pi-paw" className="p-button-secondary" onClick={() => openAddAnimalModal(rowData)} />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog header="Agregar Animal" visible={showAddAnimalModal} onHide={() => setShowAddAnimalModal(false)}>
                <div>
                    <InputText
                        placeholder="Nombre del Animal"
                        value={newAnimal.name}
                        onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                        className="p-inputtext-lg p-d-block"
                    />
                    <InputText
                        placeholder="Especie del Animal"
                        value={newAnimal.species}
                        onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })}
                        className="p-inputtext-lg p-d-block"
                    />
                </div>
                <div className="p-mt-4">
                    <Button label="Guardar Animal" icon="pi pi-save" className="p-button-primary" onClick={handleAddAnimal} />
                </div>
            </Dialog>

            <Dialog header="Actualizar Zoológico" visible={showZooModal} onHide={() => setShowZooModal(false)}>
                <div>
                    <InputText
                        placeholder="Nombre del Zoológico"
                        value={selectedZoo?.name}
                        onChange={(e) => setSelectedZoo({ ...selectedZoo, name: e.target.value })}
                        className="p-inputtext-lg p-d-block"
                    />
                    <InputText
                        placeholder="Ubicación del Zoológico"
                        value={selectedZoo?.location}
                        onChange={(e) => setSelectedZoo({ ...selectedZoo, location: e.target.value })}
                        className="p-inputtext-lg p-d-block"
                    />
                </div>
                <div className="p-mt-4">
                    <Button label="Guardar Cambios" icon="pi pi-save" className="p-button-primary" onClick={handleUpdateZoo} />
                </div>
            </Dialog>
        </div>
    );
};

export default ZooList;
