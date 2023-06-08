// importando o express
const express = require("express");
// inicializando a rota
const router = express.Router();


// dando GET nas  rotas
router
.get("/", (req, res) => {
    res.render("auth",{title:"authentication"});
})
.get("/login", (req, res) => {
    res.render("login",{title:"login"});
})

// importando o modelo
module.exports = router;