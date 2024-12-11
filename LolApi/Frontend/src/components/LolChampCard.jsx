import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export function LolChampCardComponent({ imagen, nombre, origen, lineas, roles, recurso, dificultad_uso, onFavoriteToggle }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    setIsFavorite(favoritos.includes(nombre));
  }, [nombre]);

  const handleFavoriteClick = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const newIsFavorite = !favoritos.includes(nombre);
    setIsFavorite(newIsFavorite);
    onFavoriteToggle(nombre);
  };

  return (
    <div className="card blue-grey darken-3">
      <div className="card-image">
        <img src={imagen} alt={`Campeón ${nombre}`} />
        <span className="card-title">{nombre}</span>
        <button 
          onClick={handleFavoriteClick} 
          className={`btn-floating halfway-fab waves-effect waves-light ${
            isFavorite ? 'amber accent-4' : 'grey darken-3'
          }`}
          style={{ position: 'absolute', right: '10px', top: '10px' }}
        >
          <i className="material-icons">star</i>
        </button>
      </div>
      <div className="card-content white-text">
        <ul className="collection blue-grey darken-3">
          <li className="collection-item blue-grey darken-3 white-text">
            <strong>Origen:</strong> {origen}
          </li>
          <li className="collection-item blue-grey darken-3 white-text">
            <strong>Linea:</strong> {lineas}
          </li>
          <li className="collection-item blue-grey darken-3 white-text">
            <strong>Rol:</strong> {roles}
          </li>
          <li className="collection-item blue-grey darken-3 white-text">
            <strong>Recurso:</strong> {recurso}
          </li>
          <li className="collection-item blue-grey darken-3 white-text">
            <strong>Dificultad:</strong> {dificultad_uso}
          </li>
        </ul>
      </div>
    </div>
  );
}

LolChampCardComponent.propTypes = {
  imagen: PropTypes.string,
  nombre: PropTypes.string,
  origen: PropTypes.string,
  lineas: PropTypes.string,
  roles: PropTypes.string,
  recurso: PropTypes.string,
  dificultad_uso: PropTypes.string,
  onFavoriteToggle: PropTypes.func, // Nueva prop para manejar el favorito
};