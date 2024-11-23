import MapsCRUD from '../components/MapsCRUD';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MapsPage = () => {
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
                <h1>Gestión de Mapas</h1>
                <p>Administra la lista de mapas de League of Legends</p>
            </header>
            <main className="page-content">
                <MapsCRUD />
            </main>
        </div>
    );
};

export default MapsPage;
