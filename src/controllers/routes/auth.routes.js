
const { Router } = require("express");
const router = Router();


router
.get("/",(req,res)=>{
	res.render("login",{title:"Authenticação"})
})
.post("/login",(req,res)=>{
	res.render("home",{title:"Cadastro de Clientes"})
})

module.exports = router;