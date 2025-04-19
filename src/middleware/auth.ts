import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'secreto123';

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).usuario = decoded;
    next();
  } catch {
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
};
