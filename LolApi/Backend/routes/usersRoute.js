import express from "express"
import { obtenerTodosLosUsuarios, obtenerUsuarioPorId, crearUsuario, iniciarSesion, actualizarUsuario, eliminarUsuario } from "../controllers/usersController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const autenticar = (req, res, next) => {
    try {
        const tokenRecibido = req.headers.authorization;

        if (!tokenRecibido) {
            return res.status(401).json({ mensaje: "No se proporcionó token de autenticación" });
        }

        const token = tokenRecibido.split(" ")[1];
        const datos = jwt.verify(token, process.env.SECRET);
        
        req.usuario = { id: datos.id, username: datos.username };
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: "Token inválido" });
    }
};

// Crear un router separado para rutas públicas
const publicRouter = express.Router();

// Rutas públicas
publicRouter.post('/registro', crearUsuario);
publicRouter.post('/login', iniciarSesion);
publicRouter.get('/verify', autenticar, (req, res) => {
    res.json({ isValid: true, user: req.usuario });
});

// Rutas protegidas que requieren autenticación
router.use(autenticar);
router.get('/', obtenerTodosLosUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

// Combinar los routers
const combinedRouter = express.Router();
combinedRouter.use('/', publicRouter);
combinedRouter.use('/', router);

export default combinedRouter;
