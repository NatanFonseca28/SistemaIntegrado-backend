const app = require('express')()


const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
const ejs = require("ejs");


require('./config/mongodb')


app.db = db

app.mongoose = mongoose









consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./service')
    /* Automatização de números do Dashboard */
    .then('./schedule')
    /* Serviço para envio de e-mails a partir do sistema */
    .then('./config/sendMail.js')
    /* Sistema de rotas */
    .then('./routers/routes.js')
    .into(app)


app.listen(process.env.PORT || 3000)