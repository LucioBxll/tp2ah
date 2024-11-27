import { Banner } from '../components/banner';
import { LolChampCardComponent } from "../components/LolChampCard.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import M from 'materialize-css';
import fondoCampeones from '../assets/campeones-fondo.jpg';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export function Campeones() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allChampions, setAllChampions] = useState([]);
  const [displayedChampions, setDisplayedChampions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 20;

  const slides = [
    {
      message: "Lista de\nCAMPEONES",
      type: "main",
      image: fondoCampeones
    }
  ];

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }, []);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await apiClient.get(
          `/champions`,
          {
            headers: {
              'Authorization': token ? `Bearer ${token}` : ''
            }
          }
        );
        
        if (response.data) {
          setAllChampions(response.data);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChampions();
  }, []);

  useEffect(() => {
    const filteredChamps = allChampions.filter(champ => 
      champ.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTotalPages(Math.ceil(filteredChamps.length / limit));

    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    setDisplayedChampions(filteredChamps.slice(startIndex, endIndex));
  }, [allChampions, searchTerm, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="pagination-container center-align">
        <ul className="pagination">
          <li className={currentPage === 1 ? 'disabled' : 'waves-effect'}>
            <a 
              className="cursor-pointer"
              onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
            >
              <svg className="pagination-icon" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </a>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(num => 
              num === 1 || 
              num === totalPages || 
              (num >= currentPage - 1 && num <= currentPage + 1)
            )
            .map((num, idx, arr) => {
              if (idx > 0 && num - arr[idx - 1] > 1) {
                return [
                  <li key={`ellipsis-${num}`} className="disabled">
                    <span>...</span>
                  </li>,
                  <li 
                    key={num} 
                    className={`waves-effect ${currentPage === num ? 'active amber accent-4' : ''}`}
                  >
                    <a className="cursor-pointer" onClick={() => setCurrentPage(num)}>
                      {num}
                    </a>
                  </li>
                ];
              }
              return (
                <li 
                  key={num} 
                  className={`waves-effect ${currentPage === num ? 'active amber accent-4' : ''}`}
                >
                  <a className="cursor-pointer" onClick={() => setCurrentPage(num)}>
                    {num}
                  </a>
                </li>
              );
            })}

          <li className={currentPage === totalPages ? 'disabled' : 'waves-effect'}>
            <a 
              className="cursor-pointer"
              onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}
            >
              <svg className="pagination-icon" viewBox="0 0 24 24">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 className="none">Campeones - League of Legends</h1>
      <Banner slides={slides} style={{ width: '100vw' }} />

      <div className="container">
        <section className="section">
          <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="search-wrapper">
                <div className="input-field">
                  <svg className="search-icon" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  <input
                    id="search"
                    type="text"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar campeones..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {isLoading ? (
              <div className="col s12 center-align">
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
            ) : displayedChampions.length > 0 ? (
              displayedChampions.map((champ) => (
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
                <p className="flow-text white-text">No se encontraron campeones</p>
              </div>
            )}
          </div>
          
          {displayedChampions.length > 0 && <Pagination />}
        </section>
      </div>
    </div>
  );
}