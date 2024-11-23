import Maps from "../models/mapsModels.js";

export const obtenerTodosLosMapas = async (req, res) => {
    try {
        console.log('Intentando obtener todos los mapas...');
        const mapas = await Maps.find();
        console.log('Mapas obtenidos:', mapas);
        res.json(mapas);
    } catch (error) {
        console.error('Error al obtener mapas:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

export const obtenerMapaPorId = async (req, res) => {
    try {
        const mapa = await Maps.findById(req.params.id);
        if (!mapa) {
            return res.status(404).json({ mensaje: "Mapa no encontrado" });
        }
        res.json(mapa);
    } catch (error) {
        console.error('Error al obtener mapa:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const crearMapa = async (req, res) => {
    try {
        const { nombre, linea, jungla } = req.body;
        const nuevoMapa = new Maps({ nombre, linea, jungla });
        await nuevoMapa.save();
        res.status(201).json(nuevoMapa);
    } catch (error) {
        console.error('Error al crear mapa:', error);
        res.status(400).json({ error: error.message });
    }
};

export const actualizarMapa = async (req, res) => {
    try {
        const { nombre, linea, jungla } = req.body;
        const mapaActualizado = await Maps.findByIdAndUpdate(
            req.params.id,
            { nombre, linea, jungla },
            { new: true }
        );
        if (mapaActualizado) {
            res.json(mapaActualizado);
        } else {
            res.status(404).json({ mensaje: "Mapa no encontrado" });
        }
    } catch (error) {
        console.error('Error al actualizar mapa:', error);
        res.status(400).json({ error: error.message });
    }
};

export const eliminarMapa = async (req, res) => {
    try {
        const mapaEliminado = await Maps.findByIdAndDelete(req.params.id);
        if (mapaEliminado) {
            res.json({ mensaje: "Mapa eliminado correctamente" });
        } else {
            res.status(404).json({ mensaje: "Mapa no encontrado" });
        }
    } catch (error) {
        console.error('Error al eliminar mapa:', error);
        res.status(400).json({ error: error.message });
    }
};
