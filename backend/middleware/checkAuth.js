import User from '../models/User.js';
import jwt from 'jsonwebtoken';

/**
 *  Verificar el token
 * @returns req.user
 */
export const checkAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select(
        '-password -token -createdAt -updatedAt -__v'
      );
      return next();
    } catch (error) {
      return res.status(401).json({ msg: 'Token invalidooooo' });
    }
  }
  if (!token) {
    return res.status(401).json({ msg: 'Token invalido' });
  }
  next();
};
