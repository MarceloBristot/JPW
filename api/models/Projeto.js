const mongoose = require('../data')

const ProjetoSchema = new mongoose.Schema({
    nome:  String,
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliete'
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    },
    dataRegistro: {
        type: Date,
        default: new Date()
    }
})

const Projeto = mongoose.model('Projeto', ProjetoSchema)

module.exports = Projeto