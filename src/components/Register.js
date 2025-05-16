import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate para redirigir

export default function Register() {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  // Usar useNavigate para la redirección

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
      const response = await axios.post('https://taller-api-restful-izu0.onrender.com/api/users', userData);
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      setSuccess(`Registro exitoso. Tu token es: ${token}`);
      navigate('/zoos');  // Redirigir al usuario a /zoos después del registro
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.data.message}${error.response.data.error ? ' - ' + error.response.data.error : ''}`);
        console.error('Error backend:', error.response.data);
      } else {
        setError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
        console.error('Error:', error.message);
      }
    }
  };

  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ maxWidth: '400px', width: '100%', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registro de Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Nombre de Usuario</label>
              <InputText
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña</label>
              <InputText
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px' }}
              />
            </div>
            <Button
                label="Registrar"
                icon="pi pi-user"
                className="p-button-success"
                type="submit"
                style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            />
          </form>
          {error && <div style={{ marginTop: '20px', color: 'red' }}>{error}</div>}
          {success && <div style={{ marginTop: '20px', color: 'green' }}>{success}</div>}
        </div>
      </div>
  );
}
