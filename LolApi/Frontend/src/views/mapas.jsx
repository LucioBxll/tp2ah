import { useEffect, useState } from 'react';
import { MapCardComponent } from '../components/MapCard.jsx';

export function Maps() {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/mapas'); // Asegúrate de que esta ruta sea correcta
        const data = await response.json();
        setMaps(data); // Asumiendo que la respuesta es un array de mapas
      } catch (error) {
        console.error("Error al obtener los mapas:", error);
      }
    };

    fetchMaps();
  }, []);

  return (
    <div>
      <h1>Lista de Mapas</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {maps.map((map) => (
          <MapCardComponent 
            key={map._id} // Asegúrate de que cada mapa tenga un ID único
            name={map.name}
            lineas={String(map.lineas)}
            jungla={map.jungla}
          />
        ))}
      </div>
    </div>
  );
}
