const VendaModel = require("../models/venda");
const DetalheVendaModel = require("../models/detalheVenda");
const ProdutoModel = require("../models/produto");
const venda = require("../models/venda");
const { json } = require("body-parser");

function createVenda(req, res) {
    const data = req.body;

    try {
        
        VendaModel.create({ idCliente: data.idCliente, idUser: data.idUser }, (erro, venda_data) => {
            if (venda_data) {
                
                let detalhes = data.detalhes;
                detalhes.forEach((element, index) => {
                    let detalheVenda = new DetalheVendaModel();
                    detalheVenda.idProduto = element.idProduto;
                    detalheVenda.quantidade = element.quantidade;
                    detalheVenda.idVenda = venda_data._id;
                    
                    detalheVenda.save((erro, detalhe_data) => {
                        if (detalhe_data) {
    
                            ProdutoModel.findById({ _id: element.idProduto }, (erro, produto_data) => {

                                if (produto_data) {
                                    ProdutoModel.findByIdAndUpdate({ _id: produto_data._id }, {
                                        estoque: parseInt(produto_data.estoque) - parseInt( element.quantidade)
                                    }, (erro, estoque) => {
                                        if (estoque) {
                                            res.status(201).end();
                                            // res.status(201).send({ message: "Venda Finalizadada!" });
                                        } else {
                                            res.status(404).send({ message: "Não foi possível realizar a venda!" });
                                        }
                                    });
                                } else {
                                    res.status(404).send({ message: "Quantidade no estoque não é suficiente para essa venda:" });
                                }
                            });
    
                        } else {
                            res.status(404).send({ message: "Não foi possível incluir os Produtos na venda!" });
                        }
                    });
                });


            } else {
                res.status(404).send({ message: "Não foi possível realizar a venda!" });
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

                DetalheVendaModel.find({ idVenda: id }, (erro, detalhe_data) => {
                    if (detalhe_data) {
                        res.status(200).send({ message: "Lista", venda: venda_data, detalhe: detalhe_data });
                    }
                })

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