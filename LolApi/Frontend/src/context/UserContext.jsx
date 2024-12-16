import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');

        if (token && role) {
            setUser({
                token,
                role
            });
        }
        setLoading(false);
    }, []);

    const login = (token, role) => {
        if (!token || !role) {
            console.error('Token o rol faltante:', { token, role });
            return;
        }
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        setUser({ token, role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setUser(null);
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <UserContext.Provider value={{ user, login, logout, isAdmin }}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser debe ser usado dentro de un UserProvider');
    }
    return context;
}; 