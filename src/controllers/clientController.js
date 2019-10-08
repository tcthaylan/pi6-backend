const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const authMiddleWare = require('../middlewares/auth');

router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.json(restaurants);
  } catch (error) {
    return res.status(400).send({ error })
  }
});


module.exports = (app) => app.use('/client', router);
