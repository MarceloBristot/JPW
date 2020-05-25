const mongoose = require('../data')

const ProdutoSchema = new mongoose.Schema({
    nome:  String,
    versao: String,
    dataRegistro: {
        type: Date,
        default: new Date()
    },
})

const Produto = mongoose.model('Produto', ProdutoSchema)

module.exports = Produto