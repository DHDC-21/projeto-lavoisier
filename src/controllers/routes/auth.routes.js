
const { Router } = require("express");
const router = Router();

const loginPost = require("../functions/auth");


router
.get("/",(req,res)=>{
	res.render("login",{title:"Authenticação"})
})
.post("/login", loginPost)


module.exports = router;