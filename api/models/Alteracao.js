const mongoose = require('../data')

const AlteracaoSchema = new mongoose.Schema({
    projeto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projeto'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    },
    comentarios: [{ conteudo: String }],
    dataRegistro: {
        type: Date,
        default: new Date()
    }
})

const Alteracao = mongoose.model('Alteracao', AlteracaoSchema)

module.exports = Alteracao