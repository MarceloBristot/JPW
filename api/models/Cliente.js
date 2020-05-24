const mongoose = require('../data')

const ClienteSchema = new mongoose.Schema({
    nome: String,
    cidade: String,
    uf: String,
    pais: String,
    dataRegistro: {
        type: Date,
        default: new Date()
    }
})

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente