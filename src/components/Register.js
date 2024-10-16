import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('https://taller-api-restful.onrender.com/api/users', userData);
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      setSuccess(`Registro exitoso. Tu token es: ${token}`);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Registro de Usuario</h2>
        <p className="text-center text-muted mb-4">Crea una nueva cuenta para acceder al sistema.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
            <input
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>

        {error && (
          <div className="alert alert-danger mt-4" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success mt-4" role="alert">
            <strong>Éxito:</strong> {success}
          </div>
        )}
      </div>
    </div>
  );
}
