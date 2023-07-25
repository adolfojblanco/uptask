import nodemailer from 'nodemailer';

/**
 * Email de registro
 */
export const registerEmail = async (data) => {
  const { email, name, token } = data;

  // const transport = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
    // logger: true,
    debug: true,
  });

  try {
    const info = await transport.sendMail({
      from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com',
      to: email,
      subject: 'UpTask, confirma tú cuenta',
      text: `Comprueba tu cuenta en UpTask`,
      html: `<p>Hola, ${name} comprueba tu cuenta en UpTask</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: <a href="${process.env.FRONTEND}/confirm/${token}">Confirmar Cuenta</a> </p>
    <p>Si tu no creaste esta cuenta has caso omiso a este email</p>
    `,
    });
    console.log('Email enviado');
  } catch (error) {
    console.log(error);
  }
};

/**
 * Email de registro
 */
export const lostPassword = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '8e9154e5306cad',
      pass: '254830ec7fd313',
    },
  });
  try {
    const info = await transport.sendMail({
      from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com',
      to: email,
      subject: 'UpTask, restablece tú cuenta',
      text: `Confirma tu nueva contraseña UpTask`,
      html: `<p>Hola, ${name} cambia tu ccontraseña en UpTask</p>
      <p>Tu cuenta ya esta casi lista, solo debes cambiar la contraseña en el siguiente enlace: <a href="${process.env.FRONTEND}/forget-password/${token}"> Cambiar Contraseña</a> </p>
      <p>Si tu no creaste esta cuenta has caso omiso a este email</p>
    `,
    });
    // verify connection configuration
    transport.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });
  } catch (error) {
    console.log(error);
  }
};
