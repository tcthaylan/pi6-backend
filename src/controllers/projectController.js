const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth');

router.use(authMiddleWare);

router.get('/', (req, res) => {
  res.send({ ok: true })
});

module.exports = (app) => app.use('/projects', router);
