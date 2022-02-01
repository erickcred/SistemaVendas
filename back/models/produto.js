const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProdutoSchema = Schema({
    nome: String,
    descricao: String,
    imagem: String,
    precoCompra: Number,
    precoVenda: Number,
    estoque: Number,
    idCategoria: { type: Schema.ObjectId, ref: "categoria"},
    pontos: Number
});

module.exports = mongoose.model("produto", ProdutoSchema);