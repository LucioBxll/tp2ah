import { Link } from "react-router-dom";
import logo from '../assets/lol-logo.png';

export function NavBar() {
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="nav-extended">
      <div className="nav-wrapper">
        <Link to="/inicio" className="brand-logo">
          <img src={logo} alt="Logo" />
        </Link>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/campeones">Campeones</Link></li>
          <li><Link to="/mapas">Mapas</Link></li>
          
          {isLoggedIn ? (
            <>
              <li><Link to="/crud-campeones">Gestión de Campeones</Link></li>
              <li><Link to="/crud-mapas">Gestión de Mapas</Link></li>
              <li><a onClick={handleLogout} style={{cursor: 'pointer'}}>Cerrar Sesión</a></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/registro">Registrarse</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
