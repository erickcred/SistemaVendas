const ProdutoModel = require("../models/produto");
const fs = require("fs");
const pathImagem = "./uploads/produto/images"

function createProduto(req, res) {
    const data = req.body;

    if (req.files) {
        let imagePath = req.files.imagem.path;
        let nome = imagePath.split("\\");
        data.imagem = nome.pop();
    } else {
        data.imagem = null;
    }

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

    if (req.files && req.files.imagem != undefined) {
        let imagePath = req.files.imagem.path;
        let nome = imagePath.split("\\");
        data.imagem = nome.pop();

        const pathImagem = nome.toString().replaceAll(",", "\\");
        ProdutoModel.findById(id, (erro, imagem) => {
            fs.unlinkSync(`${pathImagem}\\${imagem.imagem}`);
        });
    } else {
        ProdutoModel.findById(id, (erro, imagem) => {
            data.imagem = imagem.imagem
        });
    }

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

function updateEstoque(req, res) {
    const id = req.params.id;
    const estoque = req.body.estoque;

    try {
        ProdutoModel.findById(id, (erro, produto_data) => {
            if (produto_data) {

                ProdutoModel.findOneAndUpdate(id, ({
                    estoque: parseInt(produto_data.estoque) + parseInt(estoque)
                }), (erro, estoque_data) => {
                    if (estoque_data) {
                        res.status(200).send({ message: "Estoque atualizado com sucesso!", estoque: estoque_data });
                    }
                });
                
            } else {
                res.status(404).send({ message: "Registro não encontrado!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" + erro});
    }
}

function deleteProduto(req, res) {
    const id = req.params.id;

    try {
        ProdutoModel.findByIdAndDelete({ _id: id }, (erro, produto_data) => {
            if (produto_data) {
                res.status(200).send({ message: "Produto deletado com sucesso!", produto: produto_data });
                fs.unlinkSync(`${pathImagem}\\${produto_data.imagem}`);
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
    updateEstoque,
    deleteProduto
}