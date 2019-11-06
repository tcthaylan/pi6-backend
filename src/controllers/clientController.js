const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');

router.get('/restaurants', async (req, res) => {
  try {
    console.log('opa')
    const restaurants = await Restaurant.find();
    return res.json(restaurants);
  } catch (error) {
    return res.status(400).send({ error })
  }
});

router.get('/foods/:foodName', async (req, res) => {
  try {
    const { foodName } = req.params;
    const food = await Food.find({name: new RegExp(foodName, "i")}).sort({ price: 'asc' });
    return res.json(food);
  } catch (error) {
    return res.status(400).send({ error })
  }
});

router.get('/:restaurantId/foods', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId).populate('foods')
    return res.json(restaurant);
  } catch (error) {
    return res.status(400).send({ error })
  }
});


module.exports = (app) => app.use('/client', router);
