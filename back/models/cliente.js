const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClienteSchema = Schema({
    nome: String,
    email: String,
    telefone: String,
    pontos: String,
    dataCadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model("cliente", ClienteSchema);