const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const multer = require('multer')
const multerConfig = require('../config/multer');
const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');

router.use(authMiddleware)

router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    return res.json(foods);
  } catch (error) {
    return res.status(400).send({ error })
  }
});

router.post('/', multer(multerConfig).single('picture'), async (req, res) => {
  const { restaurant_id } = req.body;
  const { filename } = req.file;
  try {
    const restaurant = await Restaurant.findById(restaurant_id)
    if (!restaurant)
      return res.status(400).send({ error: "id do usuário inválido" });

    const food = new Food({ ...req.body, restaurant_id, picture: filename });
    await food.save();

    restaurant.foods.push(food._id);
    await Restaurant.findByIdAndUpdate(restaurant_id, restaurant);

    return res.json(food)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
});

router.put('/:foodId', async (req, res) => {
  const { foodId } = req.params;
  try {
    const food = await Food.findByIdAndUpdate(foodId, req.body, {
      new: true
    });

    return res.json( food );
  } catch (error) {
    return res.status(400).send({ error })
  }
})

router.delete('/:foodId', async (req, res) => {
  // const { foodId } = req.params;
  // try {
  //   const food = Food.findById(foodId)
  //   const restaurant = Restaurant.findOne()


  //   await Restaurant.findByIdAndRemove(foodId);

  //   const restPos = user.restaurants.indexOf(foodId);
  //   user.restaurants.splice(restPos, 1);
  //   await User.findByIdAndUpdate(user_id, user);

  //   return res.status(200).send();
  // } catch (error) {
  //   return res.status(400).send({ error })
  // }
})

module.exports = app => app.use('/foods', router);