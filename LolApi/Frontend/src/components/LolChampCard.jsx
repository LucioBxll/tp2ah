import PropTypes from 'prop-types';
import styled from 'styled-components';

const LolChampCard = styled.article`
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

const ChampImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const ChampTitle = styled.div`
  font-size: 1.5em;
  margin-top: 10px;
  text-align: center;
`;

const ChampAside = styled.aside`
  margin-top: 20px;
`;

const ChampListItem = styled.ol`
  list-style-type: none;
  padding: 0;
`;

const ChampItem = styled.li`
  margin: 5px 0;
  font-size: 1em;
  strong {
  font-weight: 700;
  }
`;

export function LolChampCardComponent({ imagen, nombre, origen, lineas, roles, recurso, dificultad_uso }) {
  return (
    <LolChampCard>
      <header>
        <ChampImage alt="Imagen de campeón" src={imagen} />
        <ChampTitle>{nombre}</ChampTitle>
      </header>
      <ChampAside>
        <ChampListItem>
          <ChampItem><strong>Origen:</strong> {origen}</ChampItem>
          <ChampItem><strong>Linea:</strong> {lineas}</ChampItem>
          <ChampItem><strong>Rol:</strong> {roles}</ChampItem>
          <ChampItem><strong>Recurso:</strong> {recurso}</ChampItem>
          <ChampItem><strong>Dificultad:</strong> {dificultad_uso}</ChampItem>
        </ChampListItem>
      </ChampAside>
    </LolChampCard>
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
