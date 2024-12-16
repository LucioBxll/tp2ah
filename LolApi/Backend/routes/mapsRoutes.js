import express from "express";
import { obtenerTodosLosMapas, obtenerMapaPorId, crearMapa, actualizarMapa, eliminarMapa } from "../controllers/mapsControllers.js";
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.get('/', obtenerTodosLosMapas);

router.get('/:id', obtenerMapaPorId);

router.post('/', checkRole('admin'), crearMapa);

router.put('/:id', checkRole('admin'), actualizarMapa);

router.delete('/:id', checkRole('admin'), eliminarMapa);

export default router;
