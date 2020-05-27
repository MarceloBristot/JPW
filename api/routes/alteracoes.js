const express = require('express')
const router = express.Router()
const Alteracao = require('../models/Alteracao')
const jwt = require('jsonwebtoken')
router.use(express.json())

router.use(function (req, res, next) {
    var tokenAuthorization = req.headers.authorization;
    if (!tokenAuthorization) {
        res.status(400).json({ error: 'Recurso não permitido!' });
        return;
    }
    jwt.verify(tokenAuthorization, req.app.get('token-auth-secret'), (err, usuario) => {
        if (err) {
            res.status(400).json({ error: 'Recurso não permitido!', motivo: err });
            return;
        }
        req.usuarioId = usuario.id;
        next();
    });
});

router.get("/", async (req, res) => {
    try {
        var limit = req.query.limit ? parseInt(req.query.limit) : 10
        var filter = req.query.nome ? { nome: req.query.nome } : {}
        var alteracao = await Alteracao.find(filter).limit(limit)
        res.json(alteracao)
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.get('/:_id', function (req, res) {
    try {
        Alteracao.findOne({ _id: req.params._id }, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao consultar alteração!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.post('/', function (req, res) {
    try {
        var alteracao = new Alteracao(req.body)
        alteracao.save(function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao adicionar alteração!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.put('/:_id', function (req, res) {
    try {
        Alteracao.findOneAndUpdate({ _id: req.params._id }, req.body, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao alterar alteração!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.delete('/:_id', function (req, res) {
    try {
        Alteracao.findOneAndDelete({ _id: req.params._id }, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao deletar alteração!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

module.exports = router