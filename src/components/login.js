import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [touched, setTouched] = useState({ username: false, password: false });
    const navigate = useNavigate();
    const userRef = useRef(null);

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = e => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const validate = () => {
        return {
            username: form.username.trim() === '',
            password: form.password.trim() === '',
        };
    };

    const errors = validate();
    const isFormValid = !errors.username && !errors.password;

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        if (!isFormValid) return;

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
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '1rem',
            }}
        >
            <Card
                title="Iniciar Sesión"
                style={{
                    width: '100%',
                    maxWidth: 420,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    borderRadius: 12,
                    backgroundColor: 'white',
                }}
            >
                <form onSubmit={handleSubmit} noValidate>
                    <div className="p-field p-inputgroup" style={{ marginBottom: 24 }}>
                        <span className="p-inputgroup-addon" aria-hidden="true">
                            <i className="pi pi-user" />
                        </span>
                        <InputText
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Usuario"
                            ref={userRef}
                            aria-describedby="username-help"
                            aria-invalid={errors.username && touched.username}
                            className={errors.username && touched.username ? 'p-invalid' : ''}
                            autoComplete="username"
                            style={{ transition: 'border-color 0.3s ease' }}
                            required
                        />
                    </div>
                    {errors.username && touched.username && (
                        <small id="username-help" className="p-error" style={{ marginBottom: 12, display: 'block' }}>
                            El usuario es obligatorio.
                        </small>
                    )}

                    <div className="p-field p-inputgroup" style={{ marginBottom: 24 }}>
                        <span className="p-inputgroup-addon" aria-hidden="true">
                            <i className="pi pi-lock" />
                        </span>
                        <Password
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Contraseña"
                            feedback={false}
                            toggleMask
                            aria-describedby="password-help"
                            aria-invalid={errors.password && touched.password}
                            className={errors.password && touched.password ? 'p-invalid' : ''}
                            autoComplete="current-password"
                            required
                            style={{ width: '100%' }}   // Aquí está el ajuste clave
                            inputClassName="p-inputtext"
                        />
                    </div>
                    {errors.password && touched.password && (
                        <small id="password-help" className="p-error" style={{ marginBottom: 12, display: 'block' }}>
                            La contraseña es obligatoria.
                        </small>
                    )}

                    <Button
                        label="Entrar"
                        icon="pi pi-sign-in"
                        iconPos="left"
                        type="submit"
                        className="p-button-rounded p-button-lg"
                        style={{ width: '100%' }}
                        disabled={!isFormValid}
                    />

                    {error && (
                        <Message
                            severity="error"
                            text={error}
                            style={{ marginTop: 20 }}
                            aria-live="assertive"
                            role="alert"
                        />
                    )}
                </form>
            </Card>
        </div>
    );
}
