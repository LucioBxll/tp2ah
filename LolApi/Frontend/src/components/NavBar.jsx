import { Link } from "react-router-dom";
import logo from '../assets/lol-logo.png';
export function NavBar() {
  return (
    <nav className="lol-navBar">
      <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} /> 
      <ul className="lol-navBar-list-item">
        <li><a className="lol-navBar-item" href="/inicio">Inicio</a></li>
        <li><a className="lol-navBar-item" href="/campeones">Campeones</a></li>
        <li><a className="lol-navBar-item" href="/mapas">Mapas</a></li>
        <li><a className="lol-navBar-item" href="/iniciar-sesion">Iniciar Sesión</a></li>
        <li>< Link to="/registrar" className="lol-navBar-item">Registrar</Link></li>
      </ul>
    </nav>
  );
}
