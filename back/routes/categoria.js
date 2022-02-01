const express = require("express");
const router = express.Router();

const CategoriaController = require("../controller/CategoriaController");

router.post("/categoria", CategoriaController.createCategoria);
router.get("/categorias", CategoriaController.findAllCategoria);
router.get("/categoria/:id", CategoriaController.findByIdCategoria);
router.put("/categoria/:id", CategoriaController.updateCategoria);
router.delete("/categoria/:id", CategoriaController.deleteCategoria);

module.exports = router;