// importando modulos NODE
const express = require("express");
const {connection} = require('./src/models/connection');
const {User} = require('./src/models/User');


// criando o aplicativo
const app = express();
const port = 3000;


// configurando o VIEW
app.set("view engine", "ejs");
app.set("views","views");

app.use(express.static('./public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Middleware para processar o corpo das requisições
app.use(express.urlencoded({ extended: false }));


// importando as ROUTES
const testRoutes = require("./src/controllers/routes/auth.routes");


// configurando as ROUTES
app.use("/test", testRoutes);


// ouvindo o servidor na porta 3000
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Ola mundo! estou rodando na porta ${port}!");
        console.log("https://127.0.0.0:${port}")
    })
});

module.exports = app;