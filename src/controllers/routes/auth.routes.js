// importando o express
const express = require("express");
// inicializando a rota
const router = express.Router();


// dando GET nas  rotas
router
    .get('/', (req, res) => {
        res.render('index');
    })
  
    .post('/login', async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username, password } });
        
        if (user) {
        // Lógica de autenticação bem-sucedida
        res.render('dashboard', { username: user.username });
        } else {
        // Lógica de autenticação falhou
        res.render('index', { error: 'Usuário ou senha inválidos.' });
        }
    });

module.exports = router;