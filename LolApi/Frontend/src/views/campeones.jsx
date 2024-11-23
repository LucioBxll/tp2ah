import { LolChampCardComponent } from "../components/LolChampCard.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import M from 'materialize-css';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export function Campeones() {
  const [searchTerm, setSearchTerm] = useState("");
  const [champions, setChampions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

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
    const fetchChampions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`/champions?page=${currentPage}&limit=${limit}`, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });
        
        setChampions(response.data.champs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchChampions();
  }, [currentPage]);

  const Pagination = () => (
    <div className="pagination-container center-align">
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={currentPage === i + 1 ? 'active amber accent-4' : 'waves-effect'}>
            <a onClick={() => setCurrentPage(i + 1)}>{i + 1}</a>
          </li>
        ))}
      </ul>
    </div>
  );

  const filteredChampions = champions.filter(champ =>
    champ.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="none">LoL - Champions</h1>

      <div className="parallax-container">
        <div className="parallax">
          <img src="/assets/background.jpg" alt="Fondo de League of Legends" />
        </div>
        <div className="title-container valign-wrapper center-align bg">
          <h2 className="title amber-text accent-4">Lista de<br/><strong>CAMPEONES</strong></h2>
          <div className="linea1"></div>
          <div className="linea2"></div>
        </div>
      </div>

      <div className="container">
        <section className="section">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix amber-text text-accent-4">search</i>
              <input
                id="search"
                type="text"
                className="validate white-text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="search">Buscar campeones...</label>
            </div>
          </div>

          <div className="row">
            {Array.isArray(filteredChampions) && filteredChampions.length > 0 ? (
              filteredChampions
                .filter(champ => champ.imagen)
                .map((champ) => (
                  <div className="col s12 m6 l4" key={champ.id || champ._id}>
                    <LolChampCardComponent
                      imagen={champ.imagen}
                      nombre={champ.nombre}
                      origen={champ.origen || 'No disponible'}
                      lineas={champ.lineas ? champ.lineas.join(", ") : 'No disponible'}
                      roles={champ.roles ? champ.roles.join(", ") : 'No disponible'}
                      recurso={champ.recurso || 'No disponible'}
                      dificultad_uso={champ.dificultad_uso || 'No disponible'}
                    />
                  </div>
                ))
            ) : (
              <div className="col s12 center-align">
                <p className="flow-text white-text">Cargando campeones o no hay datos disponibles...</p>
              </div>
            )}
          </div>
          
          <Pagination />
        </section>
      </div>
    </div>
  );
}