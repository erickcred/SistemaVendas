const express = require("express");
const router = express.Router();

const ClienteController = require("../controller/ClienteController");

router.post("/cliente", ClienteController.createCliente);
router.get("/clientes", ClienteController.findAllCliente);
router.get("/cliente/:id", ClienteController.findByIdCliente);
router.put("/cliente/:id", ClienteController.updateCliente);
router.delete("/cliente/:id", ClienteController.deleteCliente);



module.exports = router;