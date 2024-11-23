import PropTypes from 'prop-types';
import styled from 'styled-components';

const MapCardContainer = styled.article`
  background-color: #1e2730;
  border-radius: 8px;
  color: #fff;
  padding: 20px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MapTitle = styled.div`
  font-size: 1.5em;
  margin-top: 10px;
  text-align: center;
`;

const MapDetails = styled.aside`
  margin-top: 20px;
`;

const MapListItem = styled.ol`
  list-style-type: none;
  padding: 0;
`;

const MapItem = styled.li`
  margin: 5px 0;
  font-size: 1em;
  strong {
    font-weight: 700;
  }
`;

export function MapCardComponent({ name, lineas, jungla }) {
  return (
    <MapCardContainer>
      <MapTitle>{name}</MapTitle>
      <MapDetails>
        <MapListItem>
          <MapItem><strong>Lineas:</strong> {lineas}</MapItem>
          <MapItem><strong>Jungla:</strong> {jungla ? 'Sí' : 'No'}</MapItem>
        </MapListItem>
      </MapDetails>
    </MapCardContainer>
  );
}

MapCardComponent.propTypes = {
    name: PropTypes.string.isRequired,
    lineas: PropTypes.string.isRequired,
    jungla: PropTypes.bool.isRequired,
};
