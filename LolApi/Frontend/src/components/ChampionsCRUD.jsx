import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChampionsCRUD = () => {
  const navigate = useNavigate();
  const [champions, setChampions] = useState([]);
  const [newChampion, setNewChampion] = useState({
    nombre: "",
    imagen: "",
    origen: "",
    recurso: "",
    lineas: [],
    roles: [],
    dificultad_uso: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editChampion, setEditChampion] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch("http://localhost:3000/api/champions", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al cargar campeones');
        const data = await response.json();
        setChampions(data.champs);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchChampions();
  }, [navigate]);

  const addChampion = async () => {
    try {
      if (newChampion.nombre) {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:3000/api/champions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(newChampion),          
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Error al agregar el campeón');
          return;
        }

        const addedChampion = await response.json();
        setChampions([...champions, addedChampion]);
        setNewChampion({
          nombre: "",
          imagen: "",
          origen: "",
          recurso: "",
          lineas: [],
          roles: [],
          dificultad_uso: "",
        });
      }
    } catch (error) {
      setError(error.message || 'Error al agregar el campeón');
    }
  };

  const updateChampion = async () => {
    if (editIndex !== null && editChampion._id) {
      const token = localStorage.getItem('token');
      const champToUpdate = {
        nombre: editChampion.nombre,
        imagen: editChampion.imagen,
        origen: editChampion.origen,
        recurso: editChampion.recurso,
        lineas: editChampion.lineas,
        roles: editChampion.roles,
        dificultad_uso: editChampion.dificultad_uso
      };

      try {
        const response = await fetch(`http://localhost:3000/api/champions/${editChampion._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(champToUpdate),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error al actualizar el campeón:", errorData);
          setError(errorData.error || 'Error al actualizar el campeón');
          return;
        }

        const updatedChamp = await response.json();
        const updatedChampions = champions.map((champ, index) =>
          index === editIndex ? updatedChamp : champ
        );
        setChampions(updatedChampions);
        setEditIndex(null);
        setEditChampion({});
      } catch (error) {
        setError('Error al actualizar el campeón');
        console.error(error);
      }
    }
  };

  const deleteChampion = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/champions/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const updatedChampions = champions.filter((champ) => champ._id !== id);
    setChampions(updatedChampions);
  };

  const handleEditChampionChange = (e) => {
    const { name, value } = e.target;
    setEditChampion({ ...editChampion, [name]: value });
  };

  return (
    <div className="container">
      <div className="crud-container">
        <h2 className="title">Gestión de Campeones</h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-container">
          <h3>Agregar Nuevo Campeón</h3>
          <div className="input-group">
            <input
              type="text"
              name="nombre"
              value={newChampion.nombre}
              onChange={(e) =>
                setNewChampion({ ...newChampion, nombre: e.target.value })
              }
              placeholder="Nombre del campeón"
              className="form-input"
            />
            <input
              type="text"
              name="imagen"
              value={newChampion.imagen}
              onChange={(e) =>
                setNewChampion({ ...newChampion, imagen: e.target.value })
              }
              placeholder="URL de la imagen"
              className="form-input"
            />
            <input
              type="text"
              name="origen"
              value={newChampion.origen}
              onChange={(e) =>
                setNewChampion({ ...newChampion, origen: e.target.value })
              }
              placeholder="Origen"
              className="form-input"
            />
            <input
              type="text"
              name="recurso"
              value={newChampion.recurso}
              onChange={(e) =>
                setNewChampion({ ...newChampion, recurso: e.target.value })
              }
              placeholder="Recurso"
              className="form-input"
            />
            <input
              type="text"
              name="lineas"
              value={newChampion.lineas.join(", ")}
              onChange={(e) =>
                setNewChampion({
                  ...newChampion,
                  lineas: e.target.value.split(", ")
                })
              }
              placeholder="Líneas (separadas por comas)"
              className="form-input"
            />
            <input
              type="text"
              name="roles"
              value={newChampion.roles.join(", ")}
              onChange={(e) =>
                setNewChampion({
                  ...newChampion,
                  roles: e.target.value.split(", "),
                })
              }
              placeholder="Roles (separados por comas)"
              className="form-input"
            />
            <input
              type="text"
              name="dificultad_uso"
              value={newChampion.dificultad_uso}
              onChange={(e) =>
                setNewChampion({ ...newChampion, dificultad_uso: e.target.value })
              }
              placeholder="Dificultad de uso"
              className="form-input"
            />
          </div>
          <button onClick={addChampion} className="btn btn-primary">
            Agregar Campeón
          </button>
        </div>

        <div className="champions-grid">
          {champions.map((champ, index) => (
            <div key={champ._id} className="champion-card">
              <img
                src={champ.imagen}
                alt={champ.nombre}
                className="champion-image"
              />
              <div className="champion-info">
                <h3>{champ.nombre}</h3>
                <p><strong>Origen:</strong> {champ.origen}</p>
                <p><strong>Recurso:</strong> {champ.recurso}</p>
                <p><strong>Roles:</strong> {champ.roles.join(", ")}</p>
                <p><strong>Dificultad:</strong> {champ.dificultad_uso}</p>
              </div>
              <div className="champion-actions">
                <button 
                  onClick={() => {
                    setEditIndex(index);
                    setEditChampion({...champ});
                  }}
                  className="btn btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => updateChampion()}
                  className="btn btn-save"
                >
                  Guardar
                </button>
                <button 
                  onClick={() => deleteChampion(champ._id)}
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
                    value={editChampion.nombre}
                    onChange={handleEditChampionChange}
                    placeholder="Nombre del campeón"
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="imagen"
                    value={editChampion.imagen}
                    onChange={handleEditChampionChange}
                    placeholder="URL de la imagen"
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="origen"
                    value={editChampion.origen}
                    onChange={handleEditChampionChange}
                    placeholder="Origen"
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="recurso"
                    value={editChampion.recurso}
                    onChange={handleEditChampionChange}
                    placeholder="Recurso"
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="lineas"
                    value={editChampion.lineas ? editChampion.lineas.join(", ") : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditChampion({
                        ...editChampion,
                        lineas: value.split(", ").filter(item => item)
                      });
                    }}
                    placeholder="Líneas (separadas por comas)"
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="roles"
                    value={editChampion.roles ? editChampion.roles.join(", ") : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditChampion({
                        ...editChampion,
                        roles: value.split(", ").filter(item => item)
                      });
                    }}
                    placeholder="Roles (separados por comas)"
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="dificultad_uso"
                    value={editChampion.dificultad_uso}
                    onChange={handleEditChampionChange}
                    placeholder="Dificultad de uso"
                    className="form-input"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChampionsCRUD;