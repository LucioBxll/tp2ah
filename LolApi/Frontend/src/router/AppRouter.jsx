import { createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App';
import { Inicio } from "../views/inicio";
import { Campeones } from "../views/campeones";
import { Mapas } from "../views/mapas";
import LoginForm from "../components/login";
import RegisterForm from "../components/register";
import MapsPage from '../views/MapsPage';
import ChampionsPage from '../views/ChampionsPage';
import { ProtectedAdminRoute } from '../components/ProtectedAdminRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/inicio" replace />} />
      <Route path="inicio" element={<Inicio />} />
      <Route path="campeones" element={<Campeones />} />
      <Route path="mapas" element={<Mapas />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="registro" element={<RegisterForm />} />
      <Route path="crud-campeones" element={
        <ProtectedAdminRoute>
          <ChampionsPage />
        </ProtectedAdminRoute>
      } />
      <Route path="crud-mapas" element={
        <ProtectedAdminRoute>
          <MapsPage />
        </ProtectedAdminRoute>
      } />
      <Route path="*" element={<Navigate to="/inicio" replace />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    },
    basename: '/'
  }
);

export function AppRouter() {
  return (
    <RouterProvider 
      router={router}
      fallbackElement={<div>Cargando...</div>}
    />
  );
} 