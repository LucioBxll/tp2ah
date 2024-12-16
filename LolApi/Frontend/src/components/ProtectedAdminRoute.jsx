import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '../context/UserContext';

export const ProtectedAdminRoute = ({ children }) => {
    const { isAdmin } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/inicio');
        }
    }, [isAdmin, navigate]);

    return isAdmin() ? children : null;
};

ProtectedAdminRoute.propTypes = {
    children: PropTypes.node.isRequired
}; 