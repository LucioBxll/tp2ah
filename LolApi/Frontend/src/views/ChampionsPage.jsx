import ChampionsCRUD from '../components/ChampionsCRUD';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const ChampionsPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Gestión de Campeones</h1>
                <p>Administra la lista de campeones de League of Legends</p>
            </header>
            <main className="page-content">
                <ChampionsCRUD />
            </main>
        </div>
    );
};

export default ChampionsPage;