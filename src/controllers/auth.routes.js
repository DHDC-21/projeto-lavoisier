
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(12); // Corrija para "genSaltSync"
require('dotenv').config();

const Usuario = require('../models/Usuario.js');

router.get("/login", (req, res) => {
  res.render('login', { title: 'Login', msg: '' });
});

router.post("/login", async (req, res) => {
  const { inputUsername, inputPassword } = req.body;

  try {
    const user = await Usuario.findOne({ where: { username: inputUsername } });

    if (!user) {
      return res.render('login', { title: 'Login', msg: 'Usuário não encontrado.' });
    }

    const checkPassword = await bcrypt.compare(inputPassword, user.password);

    if (!checkPassword) {
      return res.render('login', { title: 'Login', msg: 'Usuário e/ou senha estão errados!' });
    }

    res.cookie('auth_token', jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' }));

    res.redirect('/'); // Redireciona para a rota raiz
  } catch (error) {
    console.log(error);
    res.render('error', { msg: 'Erro interno no servidor.' });
  }
});

module.exports = router;
