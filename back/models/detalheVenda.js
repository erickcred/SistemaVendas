const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetalheVendaSchema = Schema({
    idProduto: { type: Schema.ObjectId, ref: "produto" },
    quantidade: Number
});

module.exports = mongoose.model("detalheVenda", DetalheVendaSchema);