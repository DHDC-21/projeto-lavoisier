
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

.get("/update/:id", async (req,res)=>{
	const clientId = req.params.id;
	res.render("clientes_update",{title:"Alterar Clientes",clientId});
})

.post('/update/:id', async (req, res) => {
	try {
		const { id, nome, endereco, telefone, CPF } = req.body;
		const clientId = req.params.id;
	
		// Atualização do cliente usando o método update()
		const deleteClient = await Client.update(
			{ id, nome, endereco, telefone, CPF },
			{ where: { id: clientId } }
		);
  
	  	console.log('Cliente atualizado:', deleteClient);
	  	res.redirect('/clients');
	} catch (error) {
	  	console.error('Erro ao atualizar cliente:', error);
	  	res.status(500).send('Erro ao atualizar cliente.');
	}
})

.get("/delete/:id", async (req,res)=>{
	const clientId = req.params.id;
	res.render("clientes_delete",{title:"Deletar Clientes",clientId});
})

.post("/delete/:id", async (req,res)=>{
	try {
		const clientId = req.params.id;
	
		// Atualização do cliente usando o método update()
		const deleteClient = await Client.destroy(
			{ where: { id: clientId } }
		);
  
	  	console.log('Cliente deletado:', deleteClient);
	  	res.redirect('/clients');
	} catch (error) {
	  	console.error('Erro ao deletar cliente:', error);
	  	res.status(500).send('Erro ao deletar cliente.');
	}
})

module.exports = router;