import { LolChampCardComponent } from "../components/LolChampCard.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

// Crear un cliente de API con Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Asegúrate de que esta URL coincida con la de tu backend
    headers: {
        'Content-Type': 'application/json'
    }
});

export function Champions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [champions, setChampions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

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

  // Agregar controles de paginación
  const Pagination = () => (
    <div className="pagination" style={{ margin: '20px 0', textAlign: 'center' }}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          disabled={currentPage === i + 1}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            backgroundColor: currentPage === i + 1 ? '#4CAF50' : '#fff',
            color: currentPage === i + 1 ? '#fff' : '#000'
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );

  const filteredChampions = champions.filter(champ =>
    champ.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Lista de Campeones</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar campeones..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="lol-champs-container" style={{ display: "flex", flexWrap: "wrap" }}>
        {Array.isArray(filteredChampions) && filteredChampions.length > 0 ? (
          filteredChampions
            .filter(champ => champ.imagen)
            .map((champ) => (
              <LolChampCardComponent
                key={champ.id || champ._id}
                imagen={champ.imagen}
                nombre={champ.nombre}
                origen={champ.origen || 'No disponible'}
                lineas={champ.lineas ? champ.lineas.join(", ") : 'No disponible'}
                roles={champ.roles ? champ.roles.join(", ") : 'No disponible'}
                recurso={champ.recurso || 'No disponible'}
                dificultad_uso={champ.dificultad_uso || 'No disponible'}
              />
            ))
        ) : (
          <p>Cargando campeones o no hay datos disponibles...</p>
        )}
      </div>
      <Pagination />
    </div>
  );
}
