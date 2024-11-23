import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import { Inicio } from "./views/inicio.jsx";
import { Campeones } from "./views/campeones.jsx";
import { Mapas } from "./views/mapas.jsx";
import LoginForm from "./components/login.jsx";
import RegisterForm from "./components/register.jsx";
import ChampionsCRUD from './components/ChampionsCRUD.jsx';
import MapsPage from './views/MapsPage';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/campeones" element={<Campeones />} />
          <Route path="/mapas" element={<Mapas />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registro" element={<RegisterForm />} />
          <Route path="/crud-campeones" element={<ChampionsCRUD />} />
          <Route path="/crud-mapas" element={<MapsPage />} />
          <Route path="/" element={<Inicio />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
