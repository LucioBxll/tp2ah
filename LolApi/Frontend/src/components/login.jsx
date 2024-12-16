import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', {
                username,
                password
            });

            if (response.data.token && response.data.role) {
                login(response.data.token, response.data.role);
                navigate('/inicio');
            } else {
                setError('Respuesta inválida del servidor');
            }
        } catch (error) {
            console.error('Error completo:', error);
            setError(error.response?.data?.mensaje || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="container">
            <h2 className="amber-text accent-4">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="input-field">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="white-text"
                    />
                    <label htmlFor="username">Usuario</label>
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="white-text"
                    />
                    <label htmlFor="password">Contraseña</label>
                </div>
                {error && <div className="red-text">{error}</div>}
                <button className="btn waves-effect waves-light amber accent-4" type="submit">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}   
