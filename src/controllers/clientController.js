const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');

router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.json(restaurants);
  } catch (error) {
    return res.status(400).send({ error })
  }
});

router.get('/foods/:foodName', async (req, res) => {
  try {
    const { foodName } = req.params;
    const food = Food.findOne({name: new RegExp('^'+foodName+'$', "i")});
    return res.json(food);
  } catch (error) {
    return res.status(400).send({ error })
  }
});

module.exports = (app) => app.use('/client', router);
