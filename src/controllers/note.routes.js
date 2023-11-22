
const express = require('express');
const router = express.Router();

const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Document, Page, pdfjs } = require('react-pdf');
const ejs = require('ejs');
const path = require('path');

const routeName = '/extratos';

const Cliente = require('../models/Cliente');
const Empresa = require('../models/Empresa.js');

const Servico = require('../models/Servico.js');
const Nota = require('../models/Nota.js');
const ItensDaNota = require('../models/ItensDaNota.js');

require('dotenv');


// INDEX
router
.get("/", async (req,res)=>{
	try {
		const nota = await Nota.findAll({
			include:[
				{
					model: ItensDaNota,
					include: [{model: Servico,},],
				},
				{model: Cliente,},
			],
		})
		  
		res.render('notas/index',{title:'Controle de Extratos de Serviço:',nota});
	} catch (error) {
		console.log(error)
		res.render('error',{msg:'Erro ao buscar extratos. '/* + error + '.'*/})
	}
})


// CREATE
router
 .get('/create', async (req,res)=>{
	let empresas, clientes, servicos, notas;
	try {
		try {
			notas = await Nota.findAll({include:[Cliente]});
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar os estratos.'});
		}
		try {
			empresas = await Empresa.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações da empresa.'});
		}
		try {
			clientes = await Cliente.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações dos clientes.'});
		}
		try {
			servicos = await Servico.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar os sevricos.'});
		}
		res.render('notas/form',{title:'Cadastro de Extratos:',empresas,clientes,servicos,notas});
	} catch (error) {
		res.render('error',{msg:'Não foi possível carregar o formulário.'});
	}
 })
 router.post('/create', async (req, res) => {
	const {
	  inputEmpresaId,
	  inputNotaId,
	  inputCodigo,
	  inputClienteId,
	  inputServicoId,
	  // inputValorUnitario,
	  inputQuantidade,
	  inputPrazo,
	  inputEntrega,
	  inputSubtotal,
	  inputInss,
	  inputAliquota,
	  inputValorTotal,
	  inputObservacao,
	} = req.body;
  
	try {
		
		console.log('Criando Nota... \n');
		const nota = await Nota.create({
			EmpresaId: inputEmpresaId,
			ClienteId: inputClienteId,
	
			// valor_total: inputValorTotal,
			observacao: inputObservacao,
			
			prazo: inputPrazo,
			entrega: inputEntrega,
		});
		

	  console.log(nota);
  
	  console.log('Criando Item da Nota...');
	  const item = await ItensDaNota.create({
		NotaId: nota.id,
		ServicoId: inputServicoId,
		quantidade: inputQuantidade,
		subtotal: inputSubtotal
	  });
	  console.log(item);
  
	  console.log(inputNotaId);
	  console.log('Redirecionando após inserção bem-sucedida...');
	  res.redirect(routeName);
	} catch (error) {
	  console.error('Erro durante a criação da nota:', error);
	  res.render('error', { msg: 'Não foi possível dar entrada na nota. ' /* + error + '.' */});
	}
  });
  

// READ
router.get('/read/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const nota = await Nota.findAll({
			include:[
				{
					model:ItensDaNota,
					include:[{model:Servico,},],
					where:{NotaId:codigo}
				},
				{model:Empresa},
				{model:Cliente},
			],
			},{
				where:{id:codigo}
		})
		console.log(nota[0].Empresa.razao_social)
		res.render('notas/profile',{title:'Comprovante(' + nota[0].id + ')',nota})
	} catch (error) {
		console.log('Erro e exibição. \n' + error + '.')	
	}
});
router.get('/read', async (req,res)=>{
	const nota = {
		ItensDaNota:{
			Servico:{}
		},
		Cliente:{},
		Empresa:{},
	}
	try {
		res.render('notas/profile',{title:'Comprovante(0)',nota})
	} catch (error) {
		console.log('Erro e exibição. \n' + error + '.')	
	}
});


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	let empresas, clientes, servicos, notas;
	try {
		try {
			notas = await Nota.findAll({include:[Cliente],where:{id:codigo}});
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar o extrato.'});
		}
		try {
			empresas = await Empresa.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações da empresa.'});
		}
		try {
			clientes = await Cliente.findAll({where:{id:notas[0].ClienteId}});
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações dos clientes.'});
		}
		try {
			servicos = await Servico.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar os serviços.'});
		}
		res.render('notas/form',{title:'Formulário de Atualização:',empresas,clientes,servicos,notas});
	} catch (error) {
		res.render('error',{msg:'Não foi possível carregar o formulário.'});
	}
 })
 .post('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	const {
		inputEmpresaId,
		inputNotaId,
		inputCodigo,
		inputClienteId,
		inputServicoId,
		// inputValorUnitario,
		inputQuantidade,
		inputPrazo,
		inputEntrega,
		inputSubtotal,
		inputInss,
		inputAliquota,
		inputValorTotal,
		inputObservacao,
	  } = req.body;
	try {
		
		const nota = await Nota.update({
			EmpresaId: inputEmpresaId,
			// ClienteId: inputClienteId,
	
			// valor_total: inputValorTotal,
			observacao: inputObservacao,
			
			prazo: inputPrazo,
			entrega: inputEntrega,
		},{
			where:{id:codigo}
		});
	  
		const item = await ItensDaNota.update({
			// NotaId: nota.id,
			ServicoId: inputServicoId,
			quantidade: inputQuantidade,
			subtotal: inputSubtotal,
		},{
			where:{NotaId:codigo}
		});
		
		console.log('Nota atualizada! \n',nota,item);
		res.redirect(routeName);
	} catch (error) {
		res.render('error',{msg:'Não foi possível atualizar o extrato. \n' + error + '.'});
	}
 });


// DELETE
router.get('/delete/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const item = await ItensDaNota.destroy({where:{NotaId:codigo}});
		const nota = await Nota.destroy({where:{id:codigo}});

		console.log('Nota removida! \n',item,nota);
		res.redirect(routeName);
	} catch (error) {
		res.render('error',{msg:'Não foi possível excluir o extrato. \n'})
	}
});


router.get('/gerar-pdf/:id', async (req, res) => {
  const codigo = req.params.id;
  const nota = await Nota.findAll({
    include: [
      {
        model: ItensDaNota,
        include: [{ model: Servico }],
        where: { NotaId: codigo },
      },
      { model: Empresa },
      { model: Cliente },
    ],
  },{
    where: { id: codigo }
  });

  try {
	 // Carrega o conteúdo do arquivo EJS
	 const filePath = path.join(__dirname, '..', 'views', 'notas', 'profile-pdf.ejs');
	 const ejsContent = fs.readFileSync(filePath, 'utf-8');
 
	 // Renderiza o conteúdo EJS
	 const html = await ejs.render(ejsContent, { /* seus dados para o EJS, se necessário */ });
 
	 // Configuração do React para gerar PDF
	 console.log('Iniciando React para gerar PDF...');
 
	 const pdfContent = ReactDOMServer.renderToString(
	   <Document>
		 <Page>
		   <div dangerouslySetInnerHTML={{ __html: html }} />
		 </Page>
	   </Document>
	 );
 
	 console.log('React para gerar PDF iniciado com sucesso.');
 
	 // Salva o conteúdo do PDF em um arquivo temporário
	 const pdfFilePath = 'output.pdf';
	 fs.writeFileSync(pdfFilePath, pdfContent, 'utf-8');
 
	 // Envia o arquivo como resposta para o cliente
	 res.download(pdfFilePath, 'output.pdf', (err) => {
	   if (err) {
		 console.error(err);
		 res.status(500).send('Internal Server Error');
	   } else {
		 // Remove o arquivo temporário após o download
		 fs.unlinkSync(pdfFilePath);
	   }
	 });
  } catch (error) {
   console.log(error);
   res.render('error',{msg:'Erro ao gerar pdf!'})
  }
});
  


module.exports = router;