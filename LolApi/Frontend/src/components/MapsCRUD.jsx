import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MapsCRUD = () => {
  const navigate = useNavigate();
  const [maps, setMaps] = useState([]);
  const [newMap, setNewMap] = useState({
    nombre: "",
    linea: "",
    jungla: false
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editMap, setEditMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaps = async () => {
      console.log('🔄 Iniciando fetchMaps - Obteniendo lista de mapas...');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('❌ No se encontró token de autenticación');
          navigate('/login');
          return;
        }

        console.log('📤 Realizando petición GET a /api/mapas');
        const response = await fetch("http://localhost:3000/api/mapas", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          console.error(`❌ Error en la respuesta: ${response.status} - ${response.statusText}`);
          throw new Error('Error al obtener los mapas');
        }

        const data = await response.json();
        console.log('✅ Mapas obtenidos exitosamente:', data);
        setMaps(data);
      } catch (error) {
        console.error('❌ Error en fetchMaps:', error.message);
        setError(error.message);
      }
    };

    fetchMaps();
  }, [navigate]);

  const addMap = async () => {
    console.log('🔄 Iniciando addMap con datos:', newMap);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch("http://localhost:3000/api/mapas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newMap),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error al agregar el mapa');
        return;
      }

      const addedMap = await response.json();
      console.log('Mapa agregado exitosamente:', addedMap);
      setMaps([...maps, addedMap]);
      setNewMap({
        nombre: "",
        linea: "",
        jungla: false
      });
    } catch (error) {
      console.error('Error en addMap:', error);
      setError(error.message || 'Error al agregar el mapa');
    }
  };

  const updateMap = async () => {
    console.log('🔄 Iniciando updateMap con datos:', editMap);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/mapas/${editMap._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editMap),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Error al actualizar el mapa');
        return;
      }

      const updatedMap = await response.json();
      console.log('Mapa actualizado exitosamente:', updatedMap);
      const updatedMaps = maps.map((map, index) =>
        index === editIndex ? updatedMap : map
      );
      setMaps(updatedMaps);
      setEditIndex(null);
      setEditMap({});
    } catch (error) {
      console.error('Error en updateMap:', error);
      setError(error.message || 'Error al actualizar el mapa');
    }
  };

  const deleteMap = async (id) => {
    console.log(`🔄 Iniciando deleteMap para el ID: ${id}`);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/mapas/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el mapa');
      }

      const updatedMaps = maps.filter((map) => map._id !== id);
      setMaps(updatedMaps);
    } catch (error) {
      setError(error.message || 'Error al eliminar el mapa');
    }
  };

  const handleEditMapChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log('Editando mapa:', { name, value, type, checked });
    setEditMap({
      ...editMap,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="container">
      <div className="crud-container">
        {error && <div className="error-message">{error}</div>}
        <div className="form-container">
          <h3>Agregar Nuevo Mapa</h3>
          <div className="input-group">
            <input
              type="text"
              name="nombre"
              value={newMap.nombre}
              onChange={(e) => setNewMap({ ...newMap, nombre: e.target.value })}
              placeholder="Nombre del mapa"
              className="form-input"
            />
            <input
              type="number"
              name="linea"
              value={newMap.linea}
              onChange={(e) => setNewMap({ ...newMap, linea: e.target.value })}
              placeholder="Número de líneas"
              className="form-input"
            />
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="jungla"
                  checked={newMap.jungla}
                  onChange={(e) => setNewMap({ ...newMap, jungla: e.target.checked })}
                />
                <span>Tiene jungla</span>
              </label>
            </div>
          </div>
          <button onClick={addMap} className="btn btn-primary">
            Agregar Mapa
          </button>
        </div>

        <div className="champions-grid">
          {maps.map((map, index) => (
            <div key={map._id} className="champion-card">
              <div className="champion-info">
                <h3>{map?.nombre || 'Sin nombre'}</h3>
                <p><strong>Líneas:</strong> {map?.linea || '0'}</p>
                <p><strong>Jungla:</strong> {map?.jungla ? 'Sí' : 'No'}</p>
              </div>
              <div className="champion-actions">
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setEditMap({...map});
                  }}
                  className="btn btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteMap(map._id)}
                  className="btn btn-delete"
                >
                  Eliminar
                </button>
              </div>
              {editIndex === index && (
                <div className="edit-form">
                  <input
                    type="text"
                    name="nombre"
                    value={editMap.nombre || ''}
                    onChange={handleEditMapChange}
                    placeholder="Nombre del mapa"
                    className="form-input"
                  />
                  <input
                    type="number"
                    name="linea"
                    value={editMap.linea || ''}
                    onChange={handleEditMapChange}
                    placeholder="Número de líneas"
                    className="form-input"
                  />
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="jungla"
                        checked={editMap.jungla || false}
                        onChange={handleEditMapChange}
                      />
                      <span>Tiene jungla</span>
                    </label>
                  </div>
                  <button 
                    onClick={updateMap}
                    className="btn btn-save"
                  >
                    Guardar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapsCRUD;
