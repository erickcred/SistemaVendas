const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendaSchema = Schema({
    idCliente: { type: Schema.ObjectId, ref: "cliente" },
    idUser: { type: Schema.ObjectId, ref: "user" },
    dataVenda: { type: Date, default: Date.now }
});

module.exports = mongoose.model("venda", VendaSchema);