import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Template Engine (PUG)
app.set("view engine", "pug");
app.set("views", "./views");

// Middlewares
app.use(express.json()); // para leer JSON del body
app.use(express.static("./public")); // recursos estáticos (css, img, etc)

// Rutas
app.use("/auth", usuarioRoutes);

// (opcional) ruta raíz para probar rápido
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});