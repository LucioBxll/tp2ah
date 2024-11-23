import mongoose from 'mongoose';

const championSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    origen: { type: String, required: true },
    recurso: { type: String, required: true },
    lineas: [{ type: String, required: true }],
    roles: [{ type: String, required: true }],
    dificultad_uso: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('lol', championSchema, 'champions');
