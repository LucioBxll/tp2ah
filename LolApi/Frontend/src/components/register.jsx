import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/registro', 
        userData
      );
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      console.log("Registro exitoso:", response.data);
      navigate('/iniciar-sesion');
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(error.response?.data?.mensaje || "Error al registrar usuario");
    }
  };

  return (
    <div className="form-container" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '2rem auto'
    }}>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="register-username">Usuario</label>
          <input
            type="text"
            id="register-username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            autoComplete="username"
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="register-password">Contraseña</label>
          <input
            type="password"
            id="register-password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            autoComplete="new-password"
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Registrarse
        </button>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
