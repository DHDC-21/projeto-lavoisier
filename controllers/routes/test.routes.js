// importando comulos necessarios para o funcionamento da rota
const express = require("express");
// inicializando a rota
const router = express.Router();

// dando GET nas rotas
router
.get("/", (req, res) => {
    res.render("teste",{title: "titulo teste"});
})
.get("/login", (req, res) => {
    res.render("login",{title:"login"});
})


module.exports = router;