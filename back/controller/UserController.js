const UserModel = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helpers/jwt");

function createUser(req, res) {
    const data = req.body;
    
    try {
        UserModel.create({
            nome: data.nome, apelido: data.apelido, email: data.email,
            password: bcrypt.hashSync(data.password), funcao: data.funcao
        }, (erro, user_data) => {
            if (user_data) {
                res.status(201).send({ message: "Usuário cadastrado com sucesso!", user: user_data });
            } else {
                res.status(204).send({ message: "Não foi possível cadastrar o usuário!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conctar ao servidor!" });
    }
}

function findAllUsers(req, res) {
    try {
        UserModel.find((erro, user_data) => {
            if (user_data) {
                res.status(200).send({ user: user_data });
            } else {
                res.status(404).send({ message: "Não há registros no momento!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conctar ao servidor" });
    }
}

function findByIdUser(req, res) {
    const id = req.params.id;

    try {
        UserModel.findById(id, (erro, user_data) => {
            if (user_data) {
                res.status(200).send({ user: user_data });
            } else {
                res.status(404).send({ message: "Registro não encontrado!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conctar ao servidor!" });
    }
}

function updateUser(req, res) {
    const id = req.params.id;
    const data = req.body;

    try {
        UserModel.findByIdAndUpdate({ _id: id }, {
            nome: data.nome, apelido: data.apelido, email: data.email,
            password: bcrypt.hashSync(data.password), funcao: data.funcao
        }, (erro, user_data) => {
            if (user_data) {
                res.status(200).send({ user: user_data });
            } else {
                res.status(404).send({ message: "Registro não encontrado!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conctar ao servidor!" });
    }
}

function login(req, res) {
    const data =  req.body;

    try {
        UserModel.findOne({ email: data.email }, (erro, user_data) => {
            if (user_data) {
                
                bcrypt.compare(data.password, user_data.password, (erro, check) => {
                    if (check) {
                        if (data.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(user_data), 
                                message: "Dados corretos!",
                                user: user_data
                            });
                        } else {
                            res.status(200).send({
                                message: "Token não encontrado!",
                                user: user_data,
                                token: jwt.createToken(user_data),
                            })
                        }
                    } else {
                        res.status(404).send({ message: "Usuário ou senha incorretos!" });
                    }
                });

            } else {
                res.status(404).send({ message: "Usuário ou senha incorretos!" });
            }
        });
    } catch (erro) {
        res.status(500).send({ message: "Não foi possível conctar ao servidor!" });
    }
}

module.exports = {
    createUser,
    findAllUsers,
    findByIdUser,
    updateUser,
    login
}