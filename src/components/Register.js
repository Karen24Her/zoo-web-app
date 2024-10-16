// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llamar a la API para registrar un nuevo usuario
    axios.post('https://taller-api-restful.onrender.com/api/users', userData)
      .then(response => {
        const token = response.data.token; // Suponiendo que el token viene en response.data.token
        // Almacenar el token en localStorage
        localStorage.setItem('jwtToken', token);
        alert("Usuario registrado exitosamente");
      })
      .catch(error => {
        console.error("Error al registrar usuario:", error);
      });
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
