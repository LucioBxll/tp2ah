import PropTypes from 'prop-types';

export function LolChampCardComponent({ imagen, nombre, origen, lineas, roles, recurso, dificultad_uso }) {
  return (
    <div className="card blue-grey darken-3">
      <div className="card-image">
        <img src={imagen} alt={`Campeón ${nombre}`} />
        <span className="card-title">{nombre}</span>
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
};