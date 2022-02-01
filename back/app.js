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
app.use("/", UserRouter);

module.exports = app;