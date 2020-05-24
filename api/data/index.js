const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:cri910206@cluster0-vratn.gcp.mongodb.net/test?retryWrites=true&w=majority')

mongoose.connection.on('connected', function(){
    console.log('Conectado ao banco de dados!')
})

module.exports = mongoose