const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://rsa:142536@cluster0.9xze8.mongodb.net/rsa_stats?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .catch(e => {
        const msg = 'ERRO: Não foi possível conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')

    })