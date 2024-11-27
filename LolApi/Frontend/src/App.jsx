import { Outlet, useNavigation } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import { Suspense } from "react";

console.log('🔄 Iniciando renderizado de App...');

function App() {
  const navigation = useNavigation();

  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Suspense fallback={<div>Cargando...</div>}>
          {navigation.state === "loading" ? (
            <div>Cargando...</div>
          ) : (
            <Outlet />
          )}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

console.log('✅ App renderizada correctamente');

export default App;
