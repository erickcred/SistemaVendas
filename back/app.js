const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 1010;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Database conection */
mongoose.connect("mongodb://localhost:27017/sistemavenda", (erro, res) => {
    if (erro) {
        throw erro;
    } else {
        console.log("Servidor iniciado!");
        app.listen(port, () => {
            console.log(`Server Started in http://localhost:${port}`);
        });
    }
});

/* Routers */
const UserRouter = require("./routes/user");
const CategoriaRouter = require("./routes/categoria");
const ClienteRouter = require("./routes/cliente");
const ProdutoRouter = require("./routes/produto");
app.use("/", UserRouter);
app.use("/", CategoriaRouter);
app.use("/", ClienteRouter);
app.use("/", ProdutoRouter);

module.exports = app;