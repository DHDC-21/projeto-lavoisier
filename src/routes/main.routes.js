
const { Router } = require("express");
const router = Router();

//const main = require("../controllers/main");

router
.get("/",(req,res) => {
	res.render("index",{title:"Pagina Inicial"});
});


module.exports = router;