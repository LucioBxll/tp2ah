import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Limpiar mensaje de error cuando el usuario empiece a escribir
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔄 Iniciando proceso de login...');
    setIsLoading(true);
    setError("");

    try {
      if (!formData.username || !formData.password) {
        console.log('❌ Validación fallida: Campos requeridos faltantes');
        throw new Error("Usuario y contraseña son requeridos");
      }

      console.log('📤 Enviando petición de login...');
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      
      console.log('✅ Login exitoso:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/inicio');
    } catch (error) {
      console.error('❌ Error en login:', error.response?.data?.mensaje || error.message);
      setError(error.response?.data?.mensaje || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">
            Usuario:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#333',
              color: '#fff'
            }}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#333',
              color: '#fff'
            }}
          />
        </div>
        
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        
        <button 
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.8rem',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            width: '100%',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}   
