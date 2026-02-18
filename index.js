import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Template Engine (PUG)
app.set("view engine", "pug");
app.set("views", "./views");

// Middlewares
app.use(express.static("./public")); // recursos estáticos (css, img, etc)

// Rutas
app.use("/auth", usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});