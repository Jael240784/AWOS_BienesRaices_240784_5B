import express from "express";

//Crea una instancia de contenedor web
const app = express();
const PORT = process.env.PORT ?? 4000;

// Middleware para leer JSON del body
app.use(express.json());

//Get
app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Bienvenido al Sistema de Bienes Raices",
  });
});

//Post
app.post("/createUser", (req, res) => {
  console.log("Se está procesando la petición del tipo POST");

  // ✅ FIX: si no mandas body en Thunder, req.body viene undefined
  const body = req.body || {};

  const nuevoUsuario = {
    nombre: body.nombre || "Jael Adrian Gonzalez Cruz",
    correo: body.correo || "i2487876@gmail.com",
  };

  res.json({
    status: 200,
    message: `Se ha solicitado la creación del usuario con el nombre ${nuevoUsuario.nombre} y el correo ${nuevoUsuario.correo}`,
  });
});

//Put
app.put("/actualizarOferta/", (req, res) => {
  console.log("Se esta procesando la petición del tipo PUT");

  const ofertaCompra = {
    clienteID: 2401,
    propiedad: 1305,
    montoOfertado: "$125,300.00",
  };

  const nuevaOferta = {
    clienteID: 1586,
    propiedad: 1305,
    montoOfertado: "$130,000.00",
  };

  res.json({
    status: 200,
    message: `Se ha actualizado la mejor oferta, de un valor de ${ofertaCompra.montoOfertado} a un nuevo valor de ${nuevaOferta.montoOfertado} 
    por el cliente con ID ${nuevaOferta.clienteID}`,
  });
});

//Patch
app.patch("/actualizarPassword/:nuevaPassword", (req, res) => {
  const usuario = {
    nombre: "Jael Adrian Gonzalez Cruz",
    correo: "i2487876@gmail.com",
    password: "12345678",
  };

  // ✅ Mejor: destructuring directo del param
  const { nuevaPassword } = req.params;

  res.json({
    status: 200,
    message: `Se ha actualizado la contraseña del usuario ${usuario.nombre} a ${nuevaPassword}`,
  });
});

//Delete
app.delete("/borrarPropiedad/:id", (req, res) => {
  console.log("Se está procesando la petición del tipo DELETE");

  const { id } = req.params;

  res.json({
    status: 200,
    message: `Se ha eliminado la propiedad con el ID ${id}`,
  });
});

app.listen(PORT, () => {
  console.log(`El servidor esta iniciando en el puerto ${PORT}`);
});