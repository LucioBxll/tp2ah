import mongoose from 'mongoose';

const mapsSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    lineas: { type: Number, required: true },
    jungla: { type: Boolean, required: true }
});

export default mongoose.model('Mapas', mapsSchema);
