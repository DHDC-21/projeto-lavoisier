
/********************************
 *! IMPORTAÇÕES DO NODE_MODULES *
 ********************************/

const express = require("express");
const morgan = require("morgan");
const path = require("path");

// import routes
const authRoutes = require("./controllers/auth.routes.js");
const clientRoutes = require("./controllers/client.routes.js");
const noteRoutes = require("./controllers/note.routes.js");
const serviceRoutes = require("./controllers/service.routes.js");
const userRoutes = require("./controllers/users.routes.js");
const workesRoutes = require("./controllers/workes.routes.js");
// const routes = require('./controllers/routes.js');


/**************************
 * ! INICIALIZAÇÃO DO APP *
 **************************/
const app = express();
require("dotenv").config();	//* essa linha tem que vir apos o app


/**************************
 * ! CONFIGURAÇÕES DO APP *
 **************************/

app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));


app.use(express.json());
app.use(morgan("short"));

 app.use(express.urlencoded({ extended: true })); // Middleware para analisar dados do formulário


/*********************
 * ! DEFININDO ROTAS *
 *********************/
// app.use(routes);
app.get("/", (req,res)=>{
	res.render("index",{title:"Menu principal"});
})
app.use(authRoutes);
app.use("/clients", clientRoutes);
app.use(noteRoutes);
app.use(serviceRoutes);
app.use(workesRoutes);
app.use(userRoutes);


/***********************
 * ! EXPORTANDO O APP *
 ***********************/
module.exports = app;