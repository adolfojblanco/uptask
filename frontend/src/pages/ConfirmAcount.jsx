import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { clienteAxios } from '../../config/clienteAxios';

export const ConfirmAcount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirm, setAccountConfirm] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${token}`;
        const { data } = await clienteAxios.get(url);
        setAlert({
          msg: data.msg,
          error: false,
        });
        setAccountConfirm(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className='text-sky-400 font-black text-6xl capitalize'>
        Confirma tu cuenta y comienza a crear tus<span className='text-slate-700'>proyectos</span>
      </h1>
      {msg && <Alert alert={alert} />}
      {accountConfirm && (
        <Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
          Inicia Sesión
        </Link>
      )}
    </>
  );
};
