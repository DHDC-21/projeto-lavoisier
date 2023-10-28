
const express = require('express');
const router = express.Router();


router
 .get("/", (req,res)=>{
	try {
		res.render('funcionarios/index',{title:'CONTORLE DE FUNCIONARIOS'})
	} catch (error) {
		res.render('erro', {msg:error})
	}
})

// CREATE
router
 .get('/create', (req,res)=>{
	try {
		//codigo
	} catch (error) {
		
	}
 })


 // READ
 router
  .get('/read', (req,res)=>{
	try {
		//codigo
	} catch (error) {
		const msg = res.status()
		res.render('erro', {msg})
	}
  })


// UPDATE
router
.get('/update', (req,res)=>{
	try {
		//codigo
	} catch (error) {
		const msg = res.status()
		res.render('erro', {msg})
	}
})


// DELETE
router
.get('/delete', (req,res)=>{
	try {
		//codigo
	} catch (error) {
		const msg = res.status()
		res.render('erro', {msg})
	}
})


module.exports = router;