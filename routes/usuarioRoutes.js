import express from "express";

const router = express.Router();

// GET (PUG)
router.get("/login", (req, res) => {
  res.render("auth/login"); // views/auth/login.pug
});

// POST
router.post("/createUser", (req, res) => {
  console.log("Se está procesando la petición del tipo POST");

  const body = req.body || {};

  const nuevoUsuario = {
    nombre: body.nombre || "Jael A. Gonzalez Cruz",
    correo: body.correo || "i2487876@gmail.com",
  };

  res.json({
    status: 200,
    message: `Se ha solicitado la creación del usuario con el nombre ${nuevoUsuario.nombre} y el correo ${nuevoUsuario.correo}`,
  });
});

// PUT
router.put("/actualizarOferta", (req, res) => {
  console.log("Se está procesando la petición del tipo PUT");

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
    message: `Se ha actualizado la mejor oferta de ${ofertaCompra.montoOfertado} a ${nuevaOferta.montoOfertado} por el cliente con ID ${nuevaOferta.clienteID}`,
  });
});

// PATCH
router.patch("/actualizarPassword/:nuevaPassword", (req, res) => {
  console.log("Se está procesando la petición del tipo PATCH");

  const { nuevaPassword } = req.params;

  res.json({
    status: 200,
    message: `Se ha actualizado la contraseña a ${nuevaPassword}`,
  });
});

// DELETE
router.delete("/borrarPropiedad/:id", (req, res) => {
  console.log("Se está procesando la petición del tipo DELETE");

  const { id } = req.params;

  res.json({
    status: 200,
    message: `Se ha eliminado la propiedad con el ID ${id}`,
  });
});

export default router;