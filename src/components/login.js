import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('https://taller-api-restful-izu0.onrender.com/api/auth/login', form);
            localStorage.setItem('jwtToken', res.data.token);
            navigate('/zoos');
        } catch (err) {
            console.error('Error al hacer login:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error en autenticación');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <h2>Iniciar Sesión</h2>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Usuario" required />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" required />
            <button type="submit">Entrar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}
