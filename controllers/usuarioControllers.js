import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import { generarToken } from "../lib/tokens.js";

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta"
  });
};

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesión"
  });
};

const formularioRecuperacion = (req, res) => {
  res.render("auth/recuperarPassword", {
    pagina: "Recuperar Password"
  });
};

const registrarUsuario = async (req, res) => {

  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: errores.array(),
      datos: req.body
    });
  }

  const { nombreUsuario, emailUsuario, passwordUsuario } = req.body;

  try {

    const existeUsuario = await Usuario.findOne({
      where: { email: emailUsuario }
    });

    if (existeUsuario) {
      return res.render("auth/registro", {
        pagina: "Crear Cuenta",
        errores: [{ msg: "El correo electrónico ya está registrado" }],
        datos: req.body
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordUsuario, salt);

    const token = generarToken();

    await Usuario.create({
      name: nombreUsuario,
      email: emailUsuario,
      password: passwordHash,
      token: token,
      confirmed: false
    });

    return res.render("templates/mensaje", {
      title: "Cuenta creada",
      msg: "La cuenta se creó correctamente. Revisa tu correo para confirmar tu cuenta."
    });

  } catch (error) {

    console.log(error);

    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: [{ msg: "Error al crear la cuenta" }],
      datos: req.body
    });

  }
};

export {
  formularioRegistro,
  formularioLogin,
  formularioRecuperacion,
  registrarUsuario
};