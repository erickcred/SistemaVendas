const express = reuire("express");
const router = express.Router();

const VendaController = require("../controller/VendaController");

router.post("/venda", VendaController.createVenda);
router.get("/vendas", VendaController.findAllVenda);
router.get("/venda/:id", VendaController.findByIdVenda);
router.put("/venda/:id", VendaController.updateVenda);
router.delete("/venda/:id", VendaController.deleteVenda);

module.exports = router;