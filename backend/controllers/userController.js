import User from '../models/User.js';
import { generarId } from '../helpers/generarid.js';
import generateJwt from '../helpers/generateJwt.js';

export const usersList = (req, res) => {
  res.json('desde API/USUARIO');
};

/**
 * Register a new user
 */
export const createUser = async (req, res) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email: email });

  if (existUser) {
    const error = new Error('Usuario ya registrado');
    return res.status(400).json({
      message: error.message,
    });
  }

  try {
    const user = new User(req.body);
    user.token = generarId();
    await user.save();

    res.status(200).json({
      message: 'Usuario creado correctamente',
      user,
    });
  } catch (error) {
    console.log(`Errror: ${error}`);
    res.status(400).json({
      error,
    });
  }
};

/**
 * Login user
 * @param {email} req email user
 * @param {password} res pasword user
 */
export const loginUser = async (req, res) => {
  // Comprobar si el usuario existe
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new Error('El usuario no esta registrado');
    return res.status(404).json({
      message: error.message,
    });
  }

  // Comprobar si el usuario esta confirmado

  if (!user.confirmado) {
    const error = new Error('Esta cuenta no esta activa');
    return res.status(403).json({
      message: error.message,
    });
  }

  // Comprobar el password
  if (await user.comparePassword(password)) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      token: generateJwt(user._id),
    });
  } else {
    const error = new Error('email y/o contraseña invalido');
    return res.status(403).json({
      message: error.message,
    });
  }
};
