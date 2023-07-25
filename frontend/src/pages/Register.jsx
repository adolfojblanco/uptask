import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { clienteAxios } from '../../config/clienteAxios';

export const Register = () => {
  const [alert, setAlert] = useState({});
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = register;
  const { msg } = alert;

  const handleInputs = ({ target }) => {
    setRegister({
      ...register,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, password2].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    if (password !== password2) {
      setAlert({
        msg: 'Las contraseñas no coinciden',
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: 'La contraseña debe tener mas de 6 caracteres',
        error: true,
      });
      return;
    }

    setAlert({});

    try {
      const { data } = await clienteAxios.post(`/users`, register);
      setAlert({
        msg: data.message,
        error: false,
      });

      setRegister({
        name: '',
        email: '',
        password: '',
        password2: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className='text-sky-400 font-black text-6xl capitalize'>
        Inicia Sesión y administra tús <span className='text-slate-700'>proyectos</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='name'>
            Nombre
          </label>
          <input
            id='name'
            type='text'
            placeholder='Tú nombre'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50 '
            name='name'
            value={name}
            onChange={handleInputs}
          />
        </div>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email de registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            name='email'
            value={email}
            onChange={handleInputs}
          />
        </div>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>
            Contraseña
          </label>
          <input
            id='password'
            type='password'
            placeholder='Tú contraseña'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            name='password'
            value={password}
            onChange={handleInputs}
          />
        </div>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password2'>
            Repetir Contraseña
          </label>
          <input
            id='password2'
            type='password'
            placeholder='Confirma tú contraseña'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            name='password2'
            value={password2}
            onChange={handleInputs}
          />
        </div>
        <input
          type='submit'
          value='Crear Cuenta'
          className='bg-sky-700 w-full py-3 text-white font-bold rounded uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'
        />
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          to='/lost-password'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </>
  );
};
