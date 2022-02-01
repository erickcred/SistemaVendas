const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriaSchema = Schema({
    nome: String,
    descricao: String
});

module.exports = mongoose.model("categoria", CategoriaSchema);