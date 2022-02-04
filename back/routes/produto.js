const express = require("express");
const multiparty = require("connect-multiparty");
const imagePath = multiparty({ uploadDir: "./uploads/produto/images"});
const router = express.Router();

const ProdutoController = require("../controller/ProdutoController");

router.post("/produto", imagePath, ProdutoController.createProduto);
router.get("/produtos", ProdutoController.findAllProduto);
router.get("/produto/:id", ProdutoController.findByIdProduto);
router.get("/produto/imagem/:id", ProdutoController.getImagem);
router.put("/produto/:id", imagePath, ProdutoController.updateProduto);
router.put("/produto/estoque/:id", ProdutoController.updateEstoque);
router.delete("/produto/:id", ProdutoController.deleteProduto);

module.exports = router;