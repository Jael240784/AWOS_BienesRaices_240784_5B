import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {

  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transport.sendMail({
    from: '"BienesRaices_240784" <no-reply@bienesraices.com>',
    to: email,
    subject: "Bienvenid@ a la Plataforma de Bienes Raíces - Confirma tu cuenta",
    html: `
        <p>Hola ${nombre}, confirma tu cuenta.</p>

        <p>Tu cuenta ya está casi lista, solo debes confirmarla en el siguiente enlace:</p>

        <a href="http://localhost:4000/auth/confirmar/${token}">
            Confirmar Cuenta
        </a>

        <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
    `
  });

};

export {
  emailRegistro
};