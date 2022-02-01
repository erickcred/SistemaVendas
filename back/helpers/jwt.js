const jwt = require("jwt-simple");
const moment = require("moment");

let secret = "JessicaMailyAshleyKimberly";

exports.createToken = (user) => {
    let payload = {
        id: user._id,
        nome: user.nome,
        apelido: user.apelido,
        email: user.email,
        funcao: user.funcao,

        dataCriacaoToken: moment().unix,
        dataExpiracaoToken: moment().add(1, "days").unix()
    }

    return jwt.encode(payload, secret);
}