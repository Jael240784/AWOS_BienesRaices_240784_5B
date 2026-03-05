import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioRecuperacion,
  registrarUsuario,
} from "../controllers/usuarioControllers.js";

const router = express.Router();

// GET (PUG)
router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.get("/recuperarPassword", formularioRecuperacion);

// POST (registro real)
router.post("/registro", registrarUsuario);

export default router;