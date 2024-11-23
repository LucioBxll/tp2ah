import express from "express";
import { obtenerTodosLosMapas, obtenerMapaPorId, crearMapa, actualizarMapa, eliminarMapa } from "../controllers/mapsControllers.js";

const router = express.Router();

router.get('/', obtenerTodosLosMapas);

router.get('/:id', obtenerMapaPorId);

router.post('/', crearMapa);

router.put('/:id', actualizarMapa);

router.delete('/:id', eliminarMapa);

export default router;
