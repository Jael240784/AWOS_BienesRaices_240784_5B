import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import { generarToken } from "../lib/tokens.js";

const formularioRegistro = (req, res) => res.render("auth/registro");
const formularioLogin = (req, res) => res.render("auth/login");
const formularioRecuperacion = (req, res) => res.render("auth/recuperarPassword");

const registrarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).render("auth/registro", {
      errores: errores.array(),
      datos: req.body,
    });
  }

  const { nombreUsuario, emailUsuario, passwordUsuario, confirmarPasswordUsuario } = req.body;
  const email = emailUsuario.toLowerCase().trim();

  if (passwordUsuario !== confirmarPasswordUsuario) {
    return res.status(400).render("auth/registro", {
      errores: [{ msg: "Las contraseñas no coinciden" }],
      datos: req.body,
    });
  }

  const existe = await Usuario.findOne({ where: { email } });
  if (existe) {
    return res.status(400).render("auth/registro", {
      errores: [{ msg: "El email ya está registrado" }],
      datos: req.body,
    });
  }

  const passwordHash = await bcrypt.hash(passwordUsuario, 10);

  await Usuario.create({
    name: nombreUsuario,
    email,
    password: passwordHash,
    token: generarToken(),
  });

  return res.redirect("/auth/login?creado=1");
};

export {
  formularioRegistro,
  formularioLogin,
  formularioRecuperacion,
  registrarUsuario,
};