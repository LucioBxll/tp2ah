import PropTypes from 'prop-types';

export function MapCardComponent({ 
  name = 'Sin nombre', 
  lineas = '0', 
  jungla = false 
}) {
  return (
    <div className="card blue-grey darken-3">
      <div className="card-content white-text">
        <span className="card-title amber-text">{name}</span>
        <ul className="collection blue-grey darken-3">
          <li className="collection-item blue-grey darken-3 white-text">
            <strong>Cantidad de líneas:</strong> {lineas}
          </li>
          <li className="collection-item blue-grey darken-3 white-text">
            <strong>Jungla:</strong> {jungla ? 'Sí' : 'No'}
          </li>
        </ul>
      </div>
    </div>
  );
}

MapCardComponent.propTypes = {
  name: PropTypes.string,
  lineas: PropTypes.string,
  jungla: PropTypes.bool
};
