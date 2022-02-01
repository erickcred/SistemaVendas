const ClienteModel = require("../models/cliente");

function createCliente(req, res) {
    const data = req.body;

    try {
        ClienteModel.findOne({ email: data.email }, (erro, exists) => {
            if (!exists) {

                ClienteModel.create({
                    nome: data.nome, email: data.email, telefone: data.telefone,
                    pontos: data.pontos
                }, (erro, cliente_data) => {
                    if (cliente_data) {
                        res.status(201).send({ message: "Cliente cadastrado com sucesso", cliente: cliente_data });
                    } else {
                        res.status(404).send({ message: "Não foi possível cadastrar o cliente!" });
                    }
                });

            } else {
                res.status(200).send({ message: "Cliente já cadastrado!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor" });
    }
}

function findAllCliente(req, res) {
    try {
        ClienteModel.find((erro, cliente_data) => {
            if (cliente_data && cliente_data != "") {
                res.status(200).send({ message: "Lista!", cliente: cliente_data });
            } else {
                res.status(404).send({ message: "Não há registro de cliente!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor" });
    }
}

function findByIdCliente(req, res) {
    const id = req.params.id;

    try {
        ClienteModel.findById({ _id: id }, (erro, cliente_data) => {
            if (cliente_data) {
                res.status(200).send({ message: "Lista", cliente: cliente_data });
            } else {
                res.status(404).send({ message: "Cliente não encontrado!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor" });
    }
}

function updateCliente(req, res) {
    const id = req.params.id;
    const data = req.body;

    try {
        ClienteModel.findByIdAndUpdate(id, {
            nome: data.nome, email: data.email, telefone: data.telefone,
            pontos: data.pontos
        }, (erro, cliente_data) => {
            if (cliente_data) {
                res.status(200).send({ message: "Cliente atualizado com sucesso!", cliente: cliente_data });
            } else {
                res.status(404).send({ message: "Cliente não encontrado!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor" });
    }
}

function deleteCliente(req, res) {
    const id = req.params.id;

    try {
        ClienteModel.findByIdAndDelete(id, (erro, cliente_data) => {
            if (cliente_data) {
                res.status(200).send({ message: "Cliente deletado com sucesso!", cliente: cliente_data });
            } else {
                res.status(404).send({ message: "Cliente não encontrado!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor" });
    }
}

module.exports = {
    createCliente,
    findAllCliente,
    findByIdCliente,
    updateCliente,
    deleteCliente
}