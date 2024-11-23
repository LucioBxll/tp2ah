import mongoose from 'mongoose';

const championsSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    origen: { type: String, required: true },
    recurso: { type: String, required: true },
    lineas: [{ type: String, required: true }],
    roles: [{ type: String, required: true }],
    dificultad_uso: { type: String, required: true }
});

export default mongoose.model('Champions', championsSchema);
