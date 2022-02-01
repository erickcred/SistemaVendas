const express = require("express");
const api = express.Router();

const UserController = require("../controller/UserController");

api.post("/user", UserController.createUser);
api.get("/users", UserController.findAllUsers);
api.get("/user/:id", UserController.findByIdUser);
api.put("/user/:id", UserController.updateUser);
api.post("/login", UserController.login);

module.exports = api;