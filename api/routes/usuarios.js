const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
router.use(express.json())

router.use(function (req, res, next) {
    if (req.url != '/entrar') {
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
    } else {
        next();
    }
});

router.get("/", async (req, res) => {
    try {
        var limit = req.query.limit ? parseInt(req.query.limit) : 10
        var filter = req.query.nome ? { nome: req.query.nome } : {}
        var usuario = await Usuario.find(filter).limit(limit)
        res.json(usuario)
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.get('/:_id', function (req, res) {
    try {
        Usuario.findOne({ _id: req.params._id }, function (err, doc) {
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

router.put('/:_id', function (req, res) {
    try {
        Usuario.findOneAndUpdate({ _id: req.params._id }, req.body, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao alterar usuário!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.delete('/:_id', function (req, res) {
    try {
        Usuario.findOneAndDelete({ _id: req.params._id }, function (err, doc) {
            if (err) res.status(400).json({ err: "Erro ao deletar usuário!" })
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor: " + err })
    }
})

router.post('/entrar', (req, res) => {
    try {
        Usuario.findOne({ login: req.body.login }, function (err, usuario) {
            if (err)
                res.status(400).json({ error: err });

            if (!usuario)
                res.status(400).json({ error: 'Usuário não encontrado' });

            if (req.body.senha === usuario.senha) {
                var token = jwt.sign({ id: usuario._id }, req.app.get('token-auth-secret'), { expiresIn: 100000 });
                res.json({ usuario, token });
            } else {
                res.json({ msg: 'Senha incorreta!' })
            }
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router