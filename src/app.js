
/********************************
 *! IMPORTAÇÕES DO NODE_MODULES *
 ********************************/

const express = require("express");
const morgan = require("morgan");
const path = require("path");

// import routes
const clientRoutes = require("./routes/client.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const testeRoutes = require('./routes/teste.routes.js');

/**************************
 * ! INICIALIZAÇÃO DO APP *
 **************************/
const app = express();
require("dotenv").config();	//* essa linha tem que vir apos o app

/**************************
 * ! CONFIGURAÇÕES DO APP *
 **************************/

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static("public"));
app.use(express.json());
app.use(morgan("short"));

 app.use(express.urlencoded({ extended: true })); // Middleware para analisar dados do formulário

//jwt

/*********************
 * ! DEFININDO ROTAS *
 *********************/

app.get("/", (req,res) =>{
	res.redirect('/teste');
});
app.get("/teste,testeRoutes");
app.use("/auth",authRoutes);
app.use("/clients",clientRoutes);


/***********************
 * ! EXPORTANDO O APPP *
 ***********************/

module.exports = app;