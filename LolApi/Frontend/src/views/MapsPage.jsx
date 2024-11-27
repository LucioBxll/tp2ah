import MapsCRUD from '../components/MapsCRUD';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MapsPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/users/verify', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('isAuthenticated');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error verificando token:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('isAuthenticated');
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };
        
        verifyAuth();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <p>Cargando...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="page-container crud-page">
            <header className="page-header crud-header">
                <h1 className="crud-title">Gestión de Mapas</h1>
                <p className="crud-subtitle">Administra la lista de mapas de League of Legends</p>
            </header>
            <main className="page-content crud-content">
                <MapsCRUD />
            </main>
        </div>
    );
};

export default MapsPage;
