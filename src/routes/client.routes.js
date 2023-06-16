
const { Router } = require("express");
const router = Router();

const Client = require("../models/Client");

router
.get("/", async (req,res)=>{
	try {
    	const clients = await Client.findAll(); // Buscar todos os clientes

    	res.render("clientes",{title:"CRUD_Clientes", clients }); // Renderizar a view e passar os clientes como variável
  	} catch (error) {
    	console.error('Erro ao buscar os clientes:', error);
    	res.status(500).send('Erro ao buscar os clientes.');
  }
})

.post("/create", async(req, res) =>{
	try{
		const{nome, endereco, telefone, CPF} = req.body;
		const newClient = Client.create({
			nome: nome,
			endereco: endereco,
			telefone: telefone,
			CPF: CPF
		});
		console.log('Cliente criado:', newClient);
    	res.redirect('/clients');
	}  catch (error){
		console.error('Erro ao criar cliente:', error);
    	res.status(500).send('Erro ao criar cliente.');
	}
})

.get("/alter",(req,res)=>{
	res.render("clientes_alter",{title:"Alterar Clientes"});
})

.get("/delete",(req,res)=>{
	res.render("clientes_delete",{title:"Deletar Clientes"});
})


module.exports = router;