import { Router } from 'express';
import Usuario from '../models/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET = 'secreto123'; // cambiá esto por una variable de entorno

// Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) return res.status(400).json({ mensaje: 'Ya existe' });

  const hash = await bcrypt.hash(password, 10);
  const nuevoUsuario = new Usuario({ email, password: hash });
  await nuevoUsuario.save();

  res.status(201).json({ mensaje: 'Usuario creado' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(404).json({ mensaje: 'No existe' });

  const ok = await bcrypt.compare(password, usuario.password);
  if (!ok) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

  const token = jwt.sign({ id: usuario._id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
