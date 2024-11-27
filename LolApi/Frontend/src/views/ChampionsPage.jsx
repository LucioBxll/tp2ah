import ChampionsCRUD from '../components/ChampionsCRUD';
import { Banner } from '../components/banner';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import championsBg from '../assets/champions-bg.jpg';

const ChampionsPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const slides = [
        {
            message: "Gestión de\nCAMPEONES",
            type: "main",
            image: championsBg
        }
    ];

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
        <div className="page-container">
            <Banner slides={slides} style={{ width: '100vw' }} />
            <div className="container">
                <section className="section">
                    <main className="page-content crud-content">
                        <ChampionsCRUD />
                    </main>
                </section>
            </div>
        </div>
    );
};

export default ChampionsPage;