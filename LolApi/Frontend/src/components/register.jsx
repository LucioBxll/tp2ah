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
    <div className="container">
      <h2 className="amber-text accent-4">Registrar Usuario</h2>
      <form onSubmit={handleRegister}>
        <div className="input-field">
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            className="white-text"
          />
          <label htmlFor="username">Usuario</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            className="white-text"
          />
          <label htmlFor="password">Contraseña</label>
        </div>
        {error && <div className="red-text">{error}</div>}
        <button className="btn waves-effect waves-light amber accent-4" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
