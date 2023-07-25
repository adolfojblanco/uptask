import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from '../components/Alert';

export const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});
  const { msg } = alert;
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/forget-password/${token}`
        );
        console.log(data);
      } catch (error) {
        setAlert({
          msg: error.response.data.message,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlert({
        msg: 'La contraseña debe tener mas de 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/forget-password/${token}`;
      const { data } = await axios.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className='text-sky-400 font-black text-6xl capitalize'>
        Restablece tu cuenta y no pierdas acceso a tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>
            Nueva Contraseña
          </label>
          <input
            id='password'
            type='password'
            placeholder='Tú contraseña'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50 '
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type='submit'
          value='Cambiar Contraseña'
          className='bg-sky-700 w-full py-3 text-white font-bold rounded uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'
        />
      </form>
    </>
  );
};
