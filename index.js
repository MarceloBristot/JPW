const express = require('express')
const cors = require('cors')
const app = express()
const rotas = {
    clientes : require('./api/routes/clientes'),
    usuarios : require('./api/routes/usuarios'),
    projetos : require('./api/routes/projetos'),
    produtos : require('./api/routes/produtos'),
    alteracoes : require('./api/routes/alteracoes')
}

app.use(cors())
app.use('/clientes', rotas.clientes)
app.use('/usuarios', rotas.usuarios)
app.use('/usuarios', rotas.projetos)
app.use('/usuarios', rotas.produtos)
app.use('/usuarios', rotas.alteracoes)

app.get('/', function (req, res) {
    res.send("Olá mundo! Este é o trabalho de JPW!")
})

app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000...")
})