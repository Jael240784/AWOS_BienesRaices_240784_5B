import express from "express";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

import "./models/Usuario.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));

app.use("/auth", usuarioRoutes);

await connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});