import { Banner } from '../components/banner';
import { useEffect } from 'react';
import M from 'materialize-css';
import bannerImage from '../assets/background.jpg';

export function Inicio() {
  const slides = [
    {
      message: "Utilizá tu\nCAMPEÓN",
      type: "main",
      image: bannerImage
    }
  ];

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }, []);

  return (
    <div>
      <Banner slides={slides} style={{ width: '100vw' }} />
      <div className="container" style={{ fontSize: '18px' }}>
        <section id="descripcion" className="section">
          <h3 className="amber-text accent-4">Descripción de la Aplicación</h3>
          <p className="flow-text white-text" style={{ fontSize: '18px !important' }}>
            Nuestra aplicación de League of Legends (LoL) es una plataforma completa que proporciona información detallada 
            sobre los campeones y mapas del juego. A través de nuestra API REST, los usuarios pueden acceder y gestionar 
            diversos datos del juego:
          </p>
          <ul className="flow-text white-text" style={{ marginLeft: '20px', fontSize: '18px !important' }}>
            <li>• Explorar campeones: Accede a información sobre nombres, roles, estadísticas, origen, recursos y dificultad.</li>
            <li>• Filtrar contenido: Busca campeones por nombre, rol, línea de juego, origen o dificultad.</li>
            <li>• Gestión de mapas: Consulta y administra información sobre los diferentes mapas del juego.</li>
            <li>• Sistema de usuarios: Registro e inicio de sesión para acceder a funcionalidades protegidas.</li>
            <li>• Operaciones CRUD: Los usuarios autenticados pueden crear, leer, actualizar y eliminar información.</li>
          </ul>
          <p className="flow-text white-text" style={{ fontSize: '18px !important' }}>
            Esta herramienta está diseñada tanto para jugadores que buscan mejorar su conocimiento del juego como para 
            desarrolladores que deseen integrar datos de LoL en sus propias aplicaciones.
          </p>
        </section>

        <section id="endpoints" className="section">
          <h3 className="amber-text accent-4">Endpoints de la API</h3>
          <ul className="collapsible amber accent-4">
            <li>
              <div className="collapsible-header white-text" style={{ fontSize: '18px' }}>
                Rutas para navegar por la API de Campeones
              </div>
              <div className="collapsible-body">
                <table className="striped responsive-table">
                  <thead>
                    <tr>
                      <th className="white-text" style={{ fontSize: '18px' }}>Rutas</th>
                      <th className="white-text" style={{ fontSize: '18px' }}>Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="white-text" style={{ fontSize: '18px' }}>
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
                    <tr>
                      <td>/api/champions/roles/:rol</td>
                      <td>Filtra campeones por rol</td>
                    </tr>
                    <tr>
                      <td>/api/champions/dificultad/:dificultad_uso</td>
                      <td>Filtra campeones por dificultad</td>
                    </tr>
                    <tr>
                      <td>/api/champions/ordenar?campo=nombre&orden=asc</td>
                      <td>Ordena campeones por campo específico</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <div className="collapsible-header white-text" style={{ fontSize: '18px' }}>
                Rutas para editar la API
              </div>
              <div className="collapsible-body">
                <table className="striped responsive-table">
                  <thead>
                    <tr>
                      <th className="white-text" style={{ fontSize: '18px' }}>Rutas</th>
                      <th className="white-text" style={{ fontSize: '18px' }}>Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="white-text" style={{ fontSize: '18px' }}>
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
            <li>
              <div className="collapsible-header white-text" style={{ fontSize: '18px' }}>
                Rutas para Mapas
              </div>
              <div className="collapsible-body">
                <table className="striped responsive-table">
                  <thead>
                    <tr>
                      <th className="white-text" style={{ fontSize: '18px' }}>Rutas</th>
                      <th className="white-text" style={{ fontSize: '18px' }}>Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="white-text" style={{ fontSize: '18px' }}>
                    <tr>
                      <td>/api/maps</td>
                      <td>Obtiene todos los mapas (GET)</td>
                    </tr>
                    <tr>
                      <td>/api/maps/:id</td>
                      <td>Obtiene un mapa específico (GET)</td>
                    </tr>
                    <tr>
                      <td>/api/maps</td>
                      <td>Crea un nuevo mapa (POST)</td>
                    </tr>
                    <tr>
                      <td>/api/maps/:id</td>
                      <td>Actualiza un mapa (PUT)</td>
                    </tr>
                    <tr>
                      <td>/api/maps/:id</td>
                      <td>Elimina un mapa (DELETE)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <div className="collapsible-header white-text" style={{ fontSize: '18px' }}>
                Rutas para Usuarios
              </div>
              <div className="collapsible-body">
                <table className="striped responsive-table">
                  <thead>
                    <tr>
                      <th className="white-text" style={{ fontSize: '18px' }}>Rutas</th>
                      <th className="white-text" style={{ fontSize: '18px' }}>Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="white-text" style={{ fontSize: '18px' }}>
                    <tr>
                      <td>/api/users/registro</td>
                      <td>Registra un nuevo usuario (POST)</td>
                    </tr>
                    <tr>
                      <td>/api/users/login</td>
                      <td>Inicia sesión de usuario (POST)</td>
                    </tr>
                    <tr>
                      <td>/api/users/verify</td>
                      <td>Verifica token de usuario (GET)</td>
                    </tr>
                    <tr>
                      <td>/api/users</td>
                      <td>Obtiene todos los usuarios (GET, protegida)</td>
                    </tr>
                    <tr>
                      <td>/api/users/:id</td>
                      <td>Obtiene un usuario específico (GET, protegida)</td>
                    </tr>
                    <tr>
                      <td>/api/users/:id</td>
                      <td>Actualiza un usuario (PUT, protegida)</td>
                    </tr>
                    <tr>
                      <td>/api/users/:id</td>
                      <td>Elimina un usuario (DELETE, protegida)</td>
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
