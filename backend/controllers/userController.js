import User from '../models/User.js';

export const usersList = (req, res) => {
  res.json('desde API/USUARIO');
};

/**
 * Registro de usuario9
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
