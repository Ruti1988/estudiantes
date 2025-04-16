import { Router, Request, Response } from 'express';
import Estudiante from '../models/Estudiante';


const router = Router();


// Obtener todos
router.get('/', async (_req, res) => {
  const estudiantes = await Estudiante.find();
  res.json(estudiantes);
});

// Crear estudiante
router.post('/', async (req, res) => {
  const nuevo = new Estudiante(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
});

// Registrar asistencia
router.put('/:id/asistencia', async (req, res) => {
  const estudiante = await Estudiante.findByIdAndUpdate(
    req.params.id,
    { ultimaAsistencia: new Date() },
    { new: true }
  );
  if (!estudiante) return res.status(404).json({ mensaje: 'No encontrado' });
  res.json(estudiante);
});

export default router;