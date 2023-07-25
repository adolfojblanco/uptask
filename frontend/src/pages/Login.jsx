import { Link } from 'react-router-dom';

export const Login = () => {
  
  return (
    <>
      <h1 className='text-sky-400 font-black text-6xl capitalize'>
        Inicia Sesión y administra tús <span className='text-slate-700'>proyectos</span>
      </h1>

      <form className='my-10 bg-white shadow rounded-lg p-10'>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            type='text'
            placeholder='Email de registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50 '
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
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50 '
          />
        </div>
        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-sky-700 w-full py-3 text-white font-bold rounded uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'
        />
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link to='/register' className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿No tienes una cuenta? Registrate
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
