// importando modulos NODE
const express = require("express");
const path = require('path');

const connection = require('./src/models/config/connection');
const User = require('./src/models/User');
const Client = require('./src/models/Client');


// criando o aplicativo
const app = express();
global.port = 3000;


// configurando o VIEW
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static('./public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Middleware para processar o corpo das requisições
app.use(express.urlencoded({ extended: false }));


// importando as rotas
const routes = require("./src/controllers/routes");
app.use("/", routes);


// ouvindo o servidor na porta 3000
app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
})

module.exports = app;