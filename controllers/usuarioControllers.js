import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";

export const formularioLogin = (req, res) => {
  res.render("auth/login", { pagina: "Iniciar Sesión" });
};

export const formularioRegistro = (req, res) => {
  res.render("auth/registro", { pagina: "Crear Cuenta" });
};

export const formularioRecuperacion = (req, res) => {
  res.render("auth/recuperarPassword", { pagina: "Recuperar Password" });
};

export const registrarUsuario = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.render("auth/registro", {
        pagina: "Crear Cuenta",
        errores: errores.array(),
        datos: req.body,
      });
    }

    const { nombreUsuario, emailUsuario, passwordUsuario } = req.body;

    const existe = await Usuario.findOne({ where: { email: emailUsuario } });
    if (existe) {
      return res.render("auth/registro", {
        pagina: "Crear Cuenta",
        errores: [{ msg: "Ese correo ya está registrado." }],
        datos: req.body,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(passwordUsuario, salt);

    const token = Math.random().toString(32).substring(2) + Date.now().toString(32);

    await Usuario.create({
      name: nombreUsuario,
      email: emailUsuario,
      password: hashed,
      token,
      confirmed: false,
    });

    return res.render("templates/mensaje", {
      title: "Cuenta creada",
      msg: "La cuenta se creó correctamente. Revisa tu correo para confirmar tu cuenta.",
      boton: { texto: "Iniciar sesión", url: "/auth/login" },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error interno");
  }
};

export const paginaConfirmacion = async (req, res) => {
  try {
    const { token } = req.params;

    const usuarioToken = await Usuario.findOne({ where: { token } });

    if (!usuarioToken) {
      return res.render("templates/mensaje", {
        title: "Error al confirmar la cuenta",
        msg: "El código de verificación no es válido o ya expiró. Intenta registrarte de nuevo.",
        boton: { texto: "Volver a registro", url: "/auth/registro" },
      });
    }

    // confirmar
    usuarioToken.token = null;
    usuarioToken.confirmed = true;
    await usuarioToken.save();

    return res.render("templates/mensaje", {
      title: "Confirmación exitosa",
      msg: `La cuenta de: ${usuarioToken.name}, asociada al correo electrónico: ${usuarioToken.email} se ha confirmado, ahora ya puedes ingresar a la plataforma.`,
      boton: { texto: "Iniciar sesión", url: "/auth/login" },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error interno");
  }
};