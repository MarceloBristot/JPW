const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')
router.use(express.json())

router.get("/", function (req, res) {
    try {
        var limit = req.query.limit ? parseInt(req.query.limit) : 10
        Usuario.find(function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao consultar usuários!" })
            res.json(doc)
        }).limit(limit)
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.get('/:nome', function (req, res) {
    try {
        Usuario.findOne({ nome: req.params.nome }, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao consultar usuário!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.post('/', function (req, res) {
    try {
        var usuario = new Usuario(req.body)
        usuario.save(function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao adicionar usuário!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.put('/:nome', function (req, res) {
    try {
        Usuario.findOneAndUpdate({ nome: req.params.nome }, req.body, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao alterar usuário!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.delete('/:nome', function (req, res) {
    try {
        Usuario.findOneAndDelete({ nome: req.params.nome }, function (err, doc) {
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})


module.exports = router