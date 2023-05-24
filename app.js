// importando modulos NODE
const express = require("express");
// const bootstrap = require("bootstrap");


// criando o aplicativo
const app = express();


// configurando o VIEW
app.set("view engine", "ejs");
app.set("views","views");


app.use(express.static('./public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


// importando as ROUTES
const testRoutes = require("./controllers/routes/test.routes.js");


// configurando as ROUTES
app.use("/test", testRoutes);


// ouvindo o servidor na porta 3000
app.listen(3000, () => {
    console.log("Ola mundo! estou rodando na porta 3000!");
    console.log("https://127.0.0.0:3000")
})

module.exports = app;