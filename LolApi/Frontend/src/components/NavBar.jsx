import { Link } from "react-router-dom";
import logo from '../assets/lol-logo.png';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';
import M from 'materialize-css';

export function NavBar() {
  const { user, logout, isAdmin } = useUser();

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const navLinks = (
    <>
      <li><Link to="/inicio">Inicio</Link></li>
      <li><Link to="/campeones">Campeones</Link></li>
      <li><Link to="/mapas">Mapas</Link></li>
      
      {user ? (
        <>
          {isAdmin() && (
            <>
              <li><Link to="/crud-campeones">Gestión de Campeones</Link></li>
              <li><Link to="/crud-mapas">Gestión de Mapas</Link></li>
            </>
          )}
          <li><a onClick={handleLogout} style={{cursor: 'pointer'}}>Cerrar Sesión</a></li>
        </>
      ) : (
        <>
          <li><Link to="/login">Iniciar Sesión</Link></li>
          <li><Link to="/registro">Registrarse</Link></li>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <Link to="/inicio" className="brand-logo">
            <img src={logo} alt="Logo" />
          </Link>
          <a href="#" data-target="mobile-nav" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {navLinks}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-nav">
        {navLinks}
      </ul>
    </>
  );
}
