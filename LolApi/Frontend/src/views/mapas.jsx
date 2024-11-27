import { Banner } from '../components/banner';
import { useEffect, useState } from 'react';
import { MapCardComponent } from '../components/MapCard';
import M from 'materialize-css';
import mapaBg from '../assets/mapa-bg.png';

export function Mapas() {
  const [maps, setMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const slides = [
    {
      message: "Lista de\nMAPAS",
      type: "main",
      image: mapaBg
    }
  ];

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }, []);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/mapas');
        if (!response.ok) {
          throw new Error('Error al obtener los mapas');
        }
        const data = await response.json();
        setMaps(data);
      } catch (err) {
        setError(`Error al cargar los mapas: ${err?.message || 'Error desconocido'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaps();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Banner slides={slides} style={{ width: '100vw' }} />
        <div className="container center-align">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-amber-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Banner slides={slides} style={{ width: '100vw' }} />
        <div className="container center-align">
          <p className="red-text">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="none">LoL - Mapas</h1>
      <Banner slides={slides} style={{ width: '100vw' }} />

      <div className="container">
        <section className="section">
          <div className="row">
            {maps && maps.length > 0 ? (
              maps.map((map) => (
                <div className="col s12 m6 l4" key={map._id}>
                  <MapCardComponent
                    name={map.name}
                    lineas={String(map.lineas)}
                    jungla={map.jungla}
                  />
                </div>
              ))
            ) : (
              <div className="col s12 center-align">
                <p className="flow-text white-text">No hay mapas disponibles</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}