import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { NavBar } from "./components/NavBar.jsx";
import { Inicio } from "./views/inicio.jsx";
import { Champions } from "./views/campeones.jsx";
import { Maps } from "./views/mapas.jsx";
import { IniciarSesion } from "./views/iniciarSesion.jsx";
import { Registrar } from "./views/registrar.jsx";


export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/campeones" element={<Champions />} />
        <Route path="/mapas" element={<Maps />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
    </Router>
  );
}

export { App };
