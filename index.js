import express from "express";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import { connectDB } from "./config/db.js";

// ✅ Cargar .env
dotenv.config();

// ✅ IMPORTANTE: cargar modelos ANTES de sync()
import "./models/Usuario.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Template Engine (PUG)
app.set("view engine", "pug");
app.set("views", "./views");

// ✅ Body parsers (para POST)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static
app.use(express.static("./public"));

// Rutas
app.use("/auth", usuarioRoutes);

// ✅ Conectar DB y luego levantar server
await connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});