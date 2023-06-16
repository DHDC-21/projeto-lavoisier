//@app.js


/********************************
 *! IMPORTAÇÕES DO NODE_MODULES *
 ********************************/
const express = require("express");
const flash = require("connect-flash");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");

// import routes
const clientRoutes = require("./src/routes/client.routes");
const authRoutes = require("./src/routes/auth.routes");

// import models
const User = require("./src/models/User");
const Client = require("./src/models/Client");


/**************************
 * ! INICIALIZAÇÃO DO APP *
 **************************/
const app = express();
require("dotenv").config();	//* essa linha tem que vir apos o app



/**************************
 * ! CONFIGURAÇÕES DO APP *
 **************************/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname,"src", "public")));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(express.json());
app.use(morgan("short"));

 app.use(express.urlencoded({ extended: true })); // Middleware para analisar dados do formulário


app.use(session({
	secret: "eletiva-script",
	resave: true,
	saveUninitialized: true
}));
app.use(flash()); //* o flash tem que vir obrigatoriamente a baixo do session


/*********************
 * ! DEFININDO ROTAS *
 *********************/
app.get("/", (req,res) =>{
	res.redirect('/auth');
});
app.use("/auth",authRoutes);
app.use("/clients",clientRoutes);


/**************************
 * ! INICIANDO O SERVIDOR *
 **************************/
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
});

/*****************
 * ! EXPORTAÇÕES *
 *****************/
//module.exports = app;