
/********************************
 *! IMPORTAÇÕES DO NODE_MODULES *
 ********************************/
const express = require("express");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const path = require("path");

const { checkAuthCookie } = require('./middlewares/authMiddleware.js');

// Importação das rotas
const defaultRoutes = require("./controllers/.routes.js");

const clientRoutes = require("./controllers/client.routes.js");
const noteRoutes = require("./controllers/note.routes.js");
const serviceRoutes = require("./controllers/service.routes.js");
const userRoutes = require("./controllers/users.routes.js");
const empresaRoutes = require("./controllers/empresa.routes.js");

const { gerarUserRoot } = require("./config/gerarUserRoot.js");
const { gerarClientes, gerarServicos, gerarEmpresa, gerarNota } = require('./config/gerarDados');


/**************************
 * ! INICIALIZAÇÃO DO APP *
 **************************/
const app = express();


/**************************
 * ! CONFIGURAÇÕES DO APP *
 **************************/
//	Converte HTML para o formato EJS
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


// Seta as seguintes pastas como estática
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public','stylesheets')));
app.use(express.static(path.join(__dirname, 'public','javascript')));


app.use(express.json());	// Permite o express ler json
app.use(cookieParser());	// Permite o express criar cookie de autenticação com o JWT
app.use(morgan("short"));

app.use(express.urlencoded({ extended: true })); // Middleware para analisar dados do formulário


/*********************
 * ! DEFININDO ROTAS *
*********************/
app.use(defaultRoutes);
app.use(checkAuthCookie);	// A partir dessa linha todas as rotas estão protegidas
app.use("/clientes", clientRoutes);
app.use("/notas", noteRoutes);
app.use("/servicos", serviceRoutes);
app.use("/usuarios", userRoutes);
app.use("/empresa", empresaRoutes);


// Gerar usuário padrão após o banco de dados ser recriado.
if(process.env.DB_FORCE == 'true'){
	gerarUserRoot();
	gerarClientes();
	gerarServicos();
	gerarEmpresa();
	gerarNota();
}


/***********************
 * ! EXPORTANDO O APP *
 ***********************/
module.exports = app;
