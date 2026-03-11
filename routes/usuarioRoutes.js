import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioRecuperacion,
  registrarUsuario,
  paginaConfirmacion,
} from "../controllers/usuarioControllers.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.get("/recuperarPassword", formularioRecuperacion);

router.get("/confirmar/:token", paginaConfirmacion);

router.post("/registro", registrarUsuario);

export default router;