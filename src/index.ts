import express from 'express';
import estudiantesRouter from './routes/estudiantes';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import { verificarToken } from './middleware/auth';
const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://atlas-sample-dataset-load-67fafe774e33ef2959e420a2:fiDUwtgkLl4HClsY@cluster0.enokbsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use('/auth', authRoutes);
app.use('/estudiantes', verificarToken, estudiantesRouter);
app.use(express.json());
app.use('/estudiantes', estudiantesRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));
