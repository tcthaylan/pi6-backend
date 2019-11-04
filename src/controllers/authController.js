const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

const router = express.Router();

const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email })) 
      res.status(400).send({ error: 'Este email já existe' });
    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ 
      user,
      token: generateToken({ id: user.id })
    });
  } catch (error) {
    return res.status(400).send({ error: 'error' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user)
    res.status(400).send({ error: 'Este usuário não existe' });

  if (!await bcrypt.compare(password, user.password))
    res.status(400).send({ error: 'Senha inválida' })

  user.password = undefined;

  return res.send({ 
    user,
    token: generateToken({ id: user.id }),
   })
});

module.exports = (app) => app.use('/auth', router);