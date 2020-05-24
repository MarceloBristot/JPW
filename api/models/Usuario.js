const mongoose = require('../data')

const UsuarioSchema = new mongoose.Schema({
    nome: String,
    sigla: String,
    //setor: String,
    login: String,
    senha: String,
    dataRegistro: {
        type: Date,
        default: new Date()
    }
})

const Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = Usuario