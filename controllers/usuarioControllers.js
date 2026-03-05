import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";

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

  if (passwordUsuario !== confirmarPasswordUsuario) {
    return res.status(400).render("auth/registro", {
      errores: [{ msg: "Las contraseñas no coinciden" }],
      datos: req.body,
    });
  }

  // Solo insertar (validación única la metemos en el commit 3)
  const passwordHash = await bcrypt.hash(passwordUsuario, 10);

  await Usuario.create({
    name: nombreUsuario,
    email: emailUsuario.toLowerCase().trim(),
    password: passwordHash,
  });

  return res.redirect("/auth/login?creado=1");
};

export {
  formularioRegistro,
  formularioLogin,
  formularioRecuperacion,
  registrarUsuario,
};