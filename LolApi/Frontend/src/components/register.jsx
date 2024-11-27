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
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Registro de Usuario</h2>
        <div className="form-group">
          <label htmlFor="register-username">Usuario</label>
          <input
            type="text"
            id="register-username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            autoComplete="username"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Contraseña</label>
          <input
            type="password"
            id="register-password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            autoComplete="new-password"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Registrarse
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
