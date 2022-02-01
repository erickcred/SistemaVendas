const express = require("express");
const router = express.Router();

const ProdutoController = require("../controller/ProdutoController");

router.post("/produto", ProdutoController.createProduto);
router.get("/produtos", ProdutoController.findAllProduto);
router.get("/produto/:id", ProdutoController.findByIdProduto);
router.put("/produto/:id", ProdutoController.updateProduto);
router.delete("/produto/:id", ProdutoController.deleteProduto);

module.exports = router;