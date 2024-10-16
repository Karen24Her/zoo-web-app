// src/components/Auth.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [token, setToken] = useState('');
  const location = useLocation(); // Usamos useLocation para obtener el token pasado desde Register.js
  const navigate = useNavigate();  // Hook para redirecciones

  // Usar el token que viene desde Register.js si está presente
  useEffect(() => {
    if (location.state?.token) {
      setToken(location.state.token);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Almacenar el token ingresado en localStorage
    localStorage.setItem('jwtToken', token);
    alert('Token guardado correctamente. Redirigiendo a la lista de zoológicos...');
    // Redirigir automáticamente a la lista de zoológicos
    navigate('/zoos');
  };

  return (
    <div>
      <h1>Autenticación</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Token JWT:</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <button type="submit">Guardar Token</button>
      </form>
    </div>
  );
};

export default Auth;
