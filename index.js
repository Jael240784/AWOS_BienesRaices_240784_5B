import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());

// GET principal
app.get("/", (req, res) => {
  console.log("Se está procesando la petición del tipo GET");

  res.json({
    status: 200,
    message: "Bienvenido al Sistema de Bienes Raices",
  });
});

// 🔥 IMPORTANTE: Conectar las rutas
app.use("/", usuarioRoutes);

app.listen(PORT, () => {
  console.log(`El servidor está iniciado en el puerto ${PORT}`);
});
