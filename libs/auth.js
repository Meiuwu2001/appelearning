// middleware/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'noloseproyectoquehicesolo';

export const verifyToken = (req) => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error('Token inválido:', error);
    return null;
  }
};
