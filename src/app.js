
/********************************
 *! IMPORTAÇÕES DO NODE_MODULES *
 ********************************/

const express = require("express");
const morgan = require("morgan");
const path = require("path");

// import routes
const defaultRoutes = require("./controllers/default.routes.js");
const authRoutes = require("./controllers/auth.routes.js");

const clientRoutes = require("./controllers/client.routes.js");
const noteRoutes = require("./controllers/note.routes.js");
const serviceRoutes = require("./controllers/service.routes.js");
const employeeRoutes = require("./controllers/employee.routes.js");
const userRoutes = require("./controllers/users.routes.js");




/**************************
 * ! INICIALIZAÇÃO DO APP *
 **************************/
const app = express();
require("dotenv").config();	//* essa linha tem que vir apos o app


/**************************
 * ! CONFIGURAÇÕES DO APP *
 **************************/
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public','stylesheets')));
app.use(express.static(path.join(__dirname, 'public','javascript')));


app.use(express.json());
app.use(morgan("short"));

app.use(express.urlencoded({ extended: true })); // Middleware para analisar dados do formulário


/*********************
 * ! DEFININDO ROTAS *
*********************/
app.use(defaultRoutes);
app.use(authRoutes);
app.use("/clientes", clientRoutes);
app.use("/notas", noteRoutes);
app.use("/servicos", serviceRoutes);
app.use("/funcionarios", employeeRoutes);
app.use("/usuarios", userRoutes);


/***********************
 * ! EXPORTANDO O APP *
 ***********************/
module.exports = app;
