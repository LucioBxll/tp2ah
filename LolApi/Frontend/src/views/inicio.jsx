import { Banner } from '../components/banner';
import { useEffect } from 'react';
import M from 'materialize-css';

export function Inicio() {
  const slides = [
    {
      message: "Utilizá tu\nCAMPEÓN",
      type: "main",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dcf7c948-8cc2-4b45-af94-df8a20542c55/dc7rff7-dcf8d220-54a7-4e49-8400-1964bd075bd0.jpg/v1/fill/w_1024,h_400,q_75,strp/league_of_legends_banner_by_milesports_dc7rff7-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6IlwvZlwvZGNmN2M5NDgtOGNjMi00YjQ1LWFmOTQtZGY4YTIwNTQyYzU1XC9kYzdyZmY3LWRjZjhkMjIwLTU0YTctNGU0OS04NDAwLTE5NjRiZDA3NWJkMC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.ihKq4xFYK3dKpWfgrJMgaSUXf1FZinVHWJr34HHr7lU"
    }
  ];

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }, []);

  return (
    <div>
      <Banner slides={slides} />
      <div className="container">
        <section id="descripcion" className="section">
          <h3 className="amber-text accent-4">Descripción de la Aplicación</h3>
          <p className="flow-text white-text">
            Nuestra aplicación de League of Legends (LoL) proporciona información detallada sobre los campeones del juego.
            Utilizando una API REST, los usuarios pueden acceder a datos como nombres, roles, estadísticas, origen,
            recursos, alineamiento y dificultad de uso de los campeones.
            Esta herramienta es ideal para jugadores que buscan mejorar su conocimiento del juego.
          </p>
        </section>

        <section id="endpoints" className="section">
          <h3 className="amber-text accent-4">Endpoints de la API</h3>
          <ul className="collapsible amber accent-4">
            <li>
              <div className="collapsible-header">
                <i className="material-icons">api</i>
                Rutas para navegar por la API
              </div>
              <div className="collapsible-body">
                <table className="striped responsive-table">
                  <thead>
                    <tr>
                      <th>Rutas</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>/api/champions</td>
                      <td>Obtiene todos los campeones</td>
                    </tr>
                    <tr>
                      <td>/api/champions/:id</td>
                      <td>Obtiene un campeón específico por ID</td>
                    </tr>
                    <tr>
                      <td>/api/champions/linea/:linea</td>
                      <td>Filtra campeones por línea de juego</td>
                    </tr>
                    <tr>
                      <td>/api/champions/recurso/:recurso</td>
                      <td>Filtra campeones por tipo de recurso</td>
                    </tr>
                    <tr>
                      <td>/api/champions/origen/:origen</td>
                      <td>Filtra campeones por origen</td>
                    </tr>
                    <tr>
                      <td>/api/champions/nombre/:nombre</td>
                      <td>Busca campeones por nombre</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                <i className="material-icons">edit</i>
                Rutas para editar la API
              </div>
              <div className="collapsible-body">
                <table className="striped responsive-table">
                  <thead>
                    <tr>
                      <th>Rutas</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>/api/champions</td>
                      <td>Crea un nuevo campeón (POST)</td>
                    </tr>
                    <tr>
                      <td>/api/champions/:id</td>
                      <td>Actualiza un campeón por ID (PUT)</td>
                    </tr>
                    <tr>
                      <td>/api/champions/:id</td>
                      <td>Elimina un campeón por ID (DELETE)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
