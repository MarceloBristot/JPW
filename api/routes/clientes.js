const express = require('express')
const router = express.Router()
const Cliente = require('../models/Cliente')
router.use(express.json())

router.get('/', function (req, res) {
    Cliente.find(function (err, doc) {
        if (err) res.status(400).json({ err: "Erro ao consultar jogadores!" })
    })
})

router.get('/:id', function (req, res) {
    res.send("Lista jogador : " + req.params.id)
})

router.post('/', function (req, res) {
    res.send("Lista jogador : " + req.params.id)
})

router.put('/', function (req, res) {
    res.send("Lista jogador : " + req.params.id)
})

router.delete('/', function (req, res) {
    Jogador.findOneAndDelete({nome: req.params.nome}, function(err,doc){
        res.json(doc)
    })
})


module.exports = router