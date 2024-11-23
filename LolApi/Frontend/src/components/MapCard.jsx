import PropTypes from 'prop-types';

export function MapCardComponent({ 
  name = 'Sin nombre', 
  lineas = '0', 
  jungla = false 
}) {
  const getImagePath = (mapName) => {
    if (!mapName || mapName === 'Sin nombre') return '/assets/maps/default.jpg';
    return `/assets/maps/${mapName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  };

  return (
    <div className="champion-card">
      <div className="map-image">
        <img 
          src={getImagePath(name)}
          alt={`Mapa ${name}`}
          onError={(e) => {
            e.target.src = '/assets/maps/default.jpg';
          }}
        />
      </div>
      <div className="champion-info">
        <h3>{name}</h3>
        <p><strong>Líneas:</strong> {lineas}</p>
        <p><strong>Jungla:</strong> {jungla ? 'Sí' : 'No'}</p>
      </div>
    </div>
  );
}

MapCardComponent.propTypes = {
  name: PropTypes.string,
  lineas: PropTypes.string,
  jungla: PropTypes.bool
};
