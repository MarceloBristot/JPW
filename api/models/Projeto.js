const mongoose = require('../data')

const ProjetoSchema = new mongoose.Schema({
    nome:  String,
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliete'
    },
    dataRegistro: {
        type: Date,
        default: new Date()
    },
    data: Date,
    posicao: String
})

const Projeto = mongoose.model('Projeto', ProjetoSchema)

module.exports = Projeto