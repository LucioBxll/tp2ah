import { useEffect, useState } from 'react';
import { MapCardComponent } from '../components/MapCard';
import M from 'materialize-css';

export function Mapas() {
  const [maps, setMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Inicializar parallax
    const elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems, {
      responsiveThreshold: 0
    });

    return () => {
      const instances = M.Parallax.getInstance(elems);
      if (instances) {
        instances.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/mapas');
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setMaps(data);
        setIsLoading(false);
      } catch (err) {
        setError(`Error al cargar los mapas: ${err?.message || 'Error desconocido'}`);
        setIsLoading(false);
      }
    };

    fetchMaps();
  }, []);

  if (isLoading) return (
    <div className="container center-align">
      <p className="white-text">Cargando...</p>
    </div>
  );

  if (error) return (
    <div className="container center-align">
      <p className="red-text">{error}</p>
    </div>
  );

  return (
    <div>
      <h1 className="none">LoL - Mapas</h1>

      <div className="parallax-container">
        <div className="parallax">
          <img src="/assets/maps-background.jpg" alt="Fondo de Mapas de LoL" />
        </div>
        <div className="title-container valign-wrapper center-align bg">
          <h2 className="title amber-text accent-4">Lista de<br/><strong>MAPAS</strong></h2>
          <div className="linea1"></div>
          <div className="linea2"></div>
        </div>
      </div>

      <div className="container">
        <section className="section">
          <div className="row">
            {maps && maps.map((map) => (
              <div className="col s12 m6 l4" key={map._id}>
                <MapCardComponent
                  name={map.nombre}
                  lineas={String(map.linea)}
                  jungla={Boolean(map.jungla)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}