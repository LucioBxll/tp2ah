export const checkRole = (role) => {
    return (req, res, next) => {
        if (req.usuario.role !== role) {
            return res.status(403).json({ 
                mensaje: "No tienes permisos para realizar esta acción" 
            });
        }
        next();
    };
};
