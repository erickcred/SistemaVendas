const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    nome: String,
    apelido: String,
    email: String,
    password: String,
    funcao: String,
    dataCadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", UserSchema);