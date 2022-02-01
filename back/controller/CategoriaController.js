const CategoriaModel = require("../models/categoria");

function createCategoria(req, res) {
    const data = req.body;
    try {
        CategoriaModel.findOne({ nome: data.nome }, (erro, exists) => {
            if (!exists) {
                
                CategoriaModel.create({
                    nome: data.nome, descricao: data.descricao
                }, (erro, categoria_data) => {
                    if (categoria_data) {
                        res.status(201).send({ message: "Categoria criada com sucesso!", categoria: categoria_data });
                    } else {
                        res.status(404).send({ message: "Não foi possível cadastrar o categoria!" })
                    }
                });

            } else {
                res.status(200).send({ message: "Categoria já cadastrada!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conectar ao Servidor!" + erro });
    }
}

function findAllCategoria(req, res) {
    try {
        CategoriaModel.find((erro, categoria_data) => {
            if (categoria_data && categoria_data != "") {
                res.status(200).send({ message: "Lista", categoria: categoria_data });
            } else {
                res.status(404).send({ message: "Não há registro de categoria!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conctar ao Servidor!" })
    }
}

function findByIdCategoria(req, res) {
    const id = req.params.id;

    try {
        CategoriaModel.findById({ _id: id }, (erro, categoria_data) => {
            if (categoria_data) {
                res.status(200).send({ message: "Lista", categoria: categoria_data });
            } else {
                res.status(404).send({ message: "Categoria não encontrada!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conctar ao Servidor!" })
    }
}

function updateCategoria(req, res) {
    const id = req.params.id;
    const data = req.body;

    try {
        CategoriaModel.findByIdAndUpdate({ _id: id }, {
            nome: data.nome, descricao: data.descricao 
        }, (erro, categoria_data) => {
            if (categoria_data) {
                res.status(200).send({ message: "Categoria atualizada com sucesso!", categoria: categoria_data });
            } else {
                res.status(404).send({ message: "Categoria não encontrada!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conctar ao Servidor!" });
    }
}

function deleteCategoria(req, res) {
    const id = req.params.id;

    try {
        CategoriaModel.findByIdAndDelete({ _id: id }, (erro, categoria_data) => {
            if (categoria_data) {
                res.status(200).send({ message: "Categoria deletada com sucesso!", categoria: categoria_data });
            } else {
                res.status(404).send({ message: "Categoria não encontrada!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conctar ao Servidor!" });
    }
}

module.exports = {
    createCategoria,
    findAllCategoria,
    findByIdCategoria,
    updateCategoria,
    deleteCategoria
}