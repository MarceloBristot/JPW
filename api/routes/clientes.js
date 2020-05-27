const express = require('express')
const router = express.Router()
const Cliente = require('../models/Cliente')
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
        var cliente = await (Cliente.find(filter).limit(limit))
        res.json(cliente)
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.get('/:_id', function (req, res) {
    try {
        Cliente.findOne({ _id: req.params._id }, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao consultar cliente!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.post('/', function (req, res) {
    try {
        var cliente = new Cliente(req.body)
        cliente.save(function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao adicionar cliente!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.put('/:_id', function (req, res) {
    try {
        Cliente.findOneAndUpdate({ _id: req.params._id }, req.body, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao alterar cliente!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.delete('/:_id', function (req, res) {
    try {
        Cliente.findOneAndDelete({ _id: req.params._id }, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao deletar cliente!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

module.exports = router