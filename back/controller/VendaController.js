const VendaModel = require("../models/venda");

function createVenda(req, res) {
    const data = req.body;

    try {
        VendaModel.create({
            idCliente: data.idCliente, idUser: data.idUser, dataVenda: data.dataVenda
        }, (erro, venda_data) => {
            if (venda_data) {
                res.status(201).send({ message: "Venda Finalizada com sucesso!", venda: venda_data });
            } else {
                res.status(404).send( { message: "Não foipossível finalizar a venda!" });
            }
        })
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}

function findAllVenda(req, res) {

    try {
        VendaModel.find((erro, venda_data) => {
            if (venda_data) {
                res.status(200).send({ message: "Lista", venda: venda_data });
            } else {
                res.status(404).send( { message: "Não há registros no momento!" });
            }
        })
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}

function findByIdVenda(req, res) {
    const id = req.params.id;

    try {
        VendaModel.findById(id, (erro, venda_data) => {
            if (venda_data) {
                res.status(200).send({ message: "Lista", venda: venda_data });
            } else {
                res.status(404).send( { message: "Registro não encontrado!" });
            }
        })
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}

function updateVenda(req, res) {
    const id = req.params.id;
    const data = req.body;

    try {
        VendaModel.findByIdAndUpdate(id, {
            idCliente: data.idCliente, idUser: data.idUser, dataVenda: data.dataVenda
        }, (erro, venda_data) => {
            if (venda_data) {
                res.status(200).send({ message: "Venda atualizada com sucesso!", venda: venda_data });
            } else {
                res.status(404).send( { message: "Registro não encontrado!" });
            }
        })
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}

function deleteVenda(req, res) {
    const id = req.params.id;

    try {
        VendaModel.findByIdAndDelete(id, (erro, venda_data) => {
            if (venda_data) {
                res.status(200).send({ message: "Registro deletdo com sucesso!", venda: venda_data });
            } else {
                res.status(404).send( { message: "Registro não encontrado!" });
            }
        })
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}

module.exports = {
    createVenda,
    findAllVenda,
    findByIdVenda,
    updateVenda,
    deleteVenda
}