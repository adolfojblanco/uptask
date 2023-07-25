import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { clienteAxios } from '../../config/clienteAxios';

export const LostPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});
  const { msg } = alert;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setAlert({
        msg: 'El email no puede estar vacio',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/users/forget-password`, {
        email,
      });
      setAlert({
        msg: data.message,
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className='text-sky-400 font-black text-6xl capitalize'>
        Recupera tú cuenta y no pierdas tus <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enviar instrucciones'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50 '
          />
        </div>
        <input
          type='submit'
          value='Recuperar Cuenta'
          className='bg-sky-700 w-full py-3 text-white font-bold rounded uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'
        />
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link to='/register' className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
};
