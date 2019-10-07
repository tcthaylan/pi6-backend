const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');

router.use(authMiddleware);

router.get('/me', async (req, res) => {
  try {
    const { user_id } = res;
    const user = await User.findById(user_id).populate('restaurants');
    return res.json({ user });
  } catch (error) {
    return res.status(400).send({ error })
  }
});

module.exports = app => app.use('/users', router);