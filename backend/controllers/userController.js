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

/**
 * Confirm account whit token
 * @param { token } req token
 */
export const confirmToken = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });

  if (!user) {
    const error = new Error('Token no valido');
    return res.status(403).json({
      message: error.message,
    });
  }

  try {
    user.confirmado = true;
    user.token = '';
    await user.save();

    res.status(200).json({
      message: 'Cuenta confirmada',
    });
  } catch (error) {
    return res.status(403).json({
      message: error.message,
    });
  }
};

/**
 * Restablecer cuenta de usuario
 * @param {email} req user email
 * @param {token} res token
 */
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new Error('El usuario no esta registrado');
    return res.status(404).json({
      message: error.message,
    });
  }

  try {
    user.token = generarId();
    await user.save();

    res.status(200).json({
      message: 'Hemos enviado un email con las instrucciones para restablecer la contraseña',
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const checkToken = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });

  if (!user) {
    const error = new Error('Token no valido');
    return res.status(403).json({
      message: error.message,
    });
  } else {
  }
};

/**
 * Add the new password
 * @param {password} req new password
 * @returns
 */
export const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });
  if (user) {
    user.password = password;
    user.token = '';
    await user.save();

    res.status(200).json({
      message: 'La constraseña se modifico correctamente',
    });
  } else {
    const error = new Error('Token no valido');
    return res.status(403).json({
      message: error.message,
    });
  }
};

export const profile = async (req, res) => {
  const { user } = req;
  console.log(user);
};
