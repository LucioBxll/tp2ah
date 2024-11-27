import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate,
  createRoutesFromElements,
  Route 
} from 'react-router-dom';
import App from './App.jsx';
import { Inicio } from "./views/inicio.jsx";
import { Campeones } from "./views/campeones.jsx";
import { Mapas } from "./views/mapas.jsx";
import LoginForm from "./components/login.jsx";
import RegisterForm from "./components/register.jsx";
import ChampionsCRUD from './components/ChampionsCRUD.jsx';
import MapsPage from './views/MapsPage';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './global.css';

console.log('🔄 Iniciando configuración del router...');

// Definir las rutas usando createRoutesFromElements
const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Navigate to="/inicio" replace />} />
    <Route path="inicio" element={<Inicio />} />
    <Route path="campeones" element={<Campeones />} />
    <Route path="mapas" element={<Mapas />} />
    <Route path="login" element={<LoginForm />} />
    <Route path="registro" element={<RegisterForm />} />
    <Route path="crud-campeones" element={<ChampionsCRUD />} />
    <Route path="crud-mapas" element={<MapsPage />} />
    <Route path="*" element={<Navigate to="/inicio" replace />} />
  </Route>
);

// Crear el router con todas las flags futuras habilitadas
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  },
  basename: '/' // Asegurarnos de que la base de la ruta está definida
});

console.log('✅ Router configurado exitosamente');

// Crear y renderizar la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider 
      router={router}
      fallbackElement={<div>Cargando...</div>}
    />
  </React.StrictMode>
);
