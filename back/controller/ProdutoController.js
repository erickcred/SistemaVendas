const ProdutoModel = require("../models/produto");

function createProduto(req, res) {
    const data = req.body;

    try {
        ProdutoModel.create({
            nome: data.nome, descricao: data.descricao, imagem: data.imagem,
            precoCompra: data.precoCompra, precoVenda: data.precoVenda, 
            estoque: data.estoque, idCategoria: data.idCategoria, pontos: data.pontos
        }, (erro, produto_data) => {
            if (produto_data) {
                res.status(201).send({ message: "Produto cadastrado com sucesso!", produto: produto_data });
            } else {
                res.status(404).send({ message: "Não foi possível cadastrar o produto!" });
            }
        });  
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}

function findAllProduto(req, res) {
    try {
        ProdutoModel.find((erro, produto_data) => {
            if (produto_data && produto_data != "") {
                res.status(200).send({ message: "Lista", produto: produto_data });
            } else {
                res.status(404).send({ message: "Não há registro de produtos!" });
            }
        });  
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}

function findByIdProduto(req, res) {
    const id = req.params.id;

    try {
        ProdutoModel.findById(id, (erro, produto_data) => {
            if (produto_data) {
                res.status(200).send({ message: "Lista", produto: produto_data });
            } else {
                res.status(404).send({ message: "Produto não encontrado!" });
            }
        });  
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}

function updateProduto(req, res) {
    const id = req.params.id;
    const data = req.body;

    try {
        ProdutoModel.findByIdAndUpdate({ _id: id }, {
            nome: data.nome, descricao: data.descricao, imagem: data.imagem,
            precoCompra: data.precoCompra, precoVenda: data.precoVenda, 
            estoque: data.estoque, idCategoria: data.idCategoria, pontos: data.pontos
        }, (erro, produto_data) => {
            if (produto_data) {
                res.status(200).send({ message: "Produto atualizado com sucesso!", produto: produto_data });
            } else {
                res.status(404).send({ message: "Produto não encontrado!" });
            }
        });  
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}

function deleteProduto(req, res) {
    const id = req.params.id;

    try {
        ProdutoModel.findByIdAndDelete({ _id: id }, (erro, produto_data) => {
            if (produto_data) {
                res.status(200).send({ message: "Produto deletado com sucesso!", produto: produto_data });
            } else {
                res.status(404).send({ message: "Produto não encontrado" });
            }
        });  
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" });
    }
}


module.exports = {
    createProduto,
    findAllProduto,
    findByIdProduto,
    updateProduto,
    deleteProduto
}