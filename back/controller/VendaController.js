const VendaModel = require("../models/venda");
const DetalheVendaModel = require("../models/detalheVenda");
const ProdutoModel = require("../models/produto");

function createVenda(req, res) {
    const data = req.body;

    try {
        VendaModel.create({
            idCliente: data.idCliente, idUser: data.idUser
        }, (erro, venda_data) => {
            if (venda_data) {

                let detalhes = data.detalheVenda;
                detalhes.forEach((element, index) => {
                    const detalhe = new DetalheVendaModel();
                    detalhe.idProduto = element.idProduto;
                    detalhe.quantidade = element.quantidade;
                    detalhe.idVenda = venda_data._id

                    detalhe.save((erro, detalhe_data) => {
                        if (detalhe_data) {

                            ProdutoModel.findById({_id: element.idProduto }, (erro, produto_data) => {
                                if (produto_data && produto_data.estoque >= element.estoque) {

                                    ProdutoModel.findByIdAndUpdate({ _id: produto_data._id}, { estoque: parseInt(produto_data.estoque) - parseInt(element.quantidade) }, (erro, estoque_data) => {
                                       if (erro) throw erro; res.status(201).send({ message: "Venda Finalizada com sucesso!", venda: venda_data });
                                        
                                    });
                                    
                                } else {
                                    res.status(404).send({ message: `Estoque insuficiente para essa venda, quantidade disponivel é de: ${produto_data.estoque}, quantidade deste item na venda: ${element.quantidade}` });
                                }
                            });

                        } else {
                            res.status(404).send({ message: "Não foi possível finalizar a venda!" });
                        }
                    })
                });

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