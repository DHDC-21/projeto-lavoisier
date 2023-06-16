
const { Router } = require("express");
const router = Router();

//const main = require("../controllers/main");

router
.get("/",(req,res)=>{
	res.render("clientes",{title:"Cadastrar Clientes"});
})
.get("/alterar",(req,res)=>{
	res.render("clientes_alterar",{title:"Alterar Clientes"});
})
.get("/deletar",(req,res)=>{
	res.render("clientes_deletar",{title:"Deletar Clientes"});
})



module.exports = router;