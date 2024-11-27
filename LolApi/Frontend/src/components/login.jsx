import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const LoginForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login', 
        userData
      );
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      console.log("Inicio de sesión exitoso:", response.data);
      navigate('/');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error.response?.data?.mensaje || "Error al iniciar sesión");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleLogin} className="register-form">
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="login-username">Usuario</label>
          <input
            type="text"
            id="login-username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            autoComplete="username"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Contraseña</label>
          <input
            type="password"
            id="login-password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            autoComplete="current-password"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Iniciar Sesión
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;   
