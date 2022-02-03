const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetalheVendaSchema = Schema({
    idProduto: { type: Schema.ObjectId, ref: "produto" },
    quantidade: Number,
    idVenda: { type: Schema.ObjectId, ref: "venda"}
});

module.exports = mongoose.model("detalheVenda", DetalheVendaSchema);