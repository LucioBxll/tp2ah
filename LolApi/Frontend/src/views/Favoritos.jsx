import { useState, useEffect } from 'react';
import { LolChampCardComponent } from '../components/LolChampCard.jsx';

export function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(storedFavorites);
  }, []);

  const handleFavoriteToggle = (nombre) => {
    const updatedFavorites = favoritos.includes(nombre)
      ? favoritos.filter(fav => fav !== nombre)
      : [...favoritos, nombre];

    setFavoritos(updatedFavorites);
    localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Campeones Favoritos</h1>
      <div className="row">
        {favoritos.length > 0 ? (
          favoritos.map((nombre) => (
            <LolChampCardComponent
              key={nombre}
              nombre={nombre}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))
        ) : (
          <p>No tienes campeones favoritos.</p>
        )}
      </div>
    </div>
  );
} 