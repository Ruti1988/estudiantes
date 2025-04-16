import { Schema, model} from 'mongoose';

const EstudianteSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    ultimaAsistencia: { type: Date, default: null }
});

export default model('Estudiante', EstudianteSchema);