import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ closeModal }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Hacemos una solicitud para listar zoológicos, enviando el token en los headers
      const response = await axios.get('https://taller-api-restful.onrender.com/api/zoos', {
        headers: {
          Authorization: `Bearer ${token}` // Enviar el token en los headers
        }
      });

      if (response.status === 200) {
        alert('Autenticación exitosa. Redirigiendo a la lista de zoológicos...');
        navigate('/zoos'); // Redirigir a la lista de zoológicos
        closeModal(); // Cerrar el modal de autenticación
      }
    } catch (err) {
      console.error("Error durante la autenticación:", err);
      setError('Autenticación fallida. Por favor, revisa el token e inténtalo de nuevo.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Auth;
