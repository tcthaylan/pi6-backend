const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');

router.use(authMiddleware)

router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.json({restaurants});
  } catch (error) {
    return res.status(400).send({ error })
  }
});

router.post('/', async (req, res) => {
  const { user_id } = res;
  try {
    const user = await User.findById(user_id)
    if (!user)
      return res.status(400).send({ error: "id do usuário inválido" });
  
    const restaurant = new Restaurant({...req.body, user_id});
    await restaurant.save();

    user.restaurants.push(restaurant._id);
    await User.findByIdAndUpdate(user_id, user);

    return res.json({restaurant})
  } catch (error) {
    console.log(error.message)
    return res.status(400).send({ error: error })
  }
});

router.put('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const { user_id } = res;

  try {
    const user = await User.findById(user_id);
    if (!user.restaurants.includes(restaurantId)) 
      return res.status(400).send({ error: "Acesso negado" })

    const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body, {
      new: true
    });

    return res.json({ restaurant });
  } catch (error) {
    return res.status(400).send({ error })
  }
})

router.delete('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const { user_id } = res;
  try {
    const user = await User.findById(user_id);

    if (!user.restaurants.includes(restaurantId)) 
      return res.status(400).send({ error: "Acesso negado" })

    await Restaurant.findByIdAndRemove(restaurantId);

    const restPos = user.restaurants.indexOf(restaurantId);
    user.restaurants.splice(restPos, 1);
    await User.findByIdAndUpdate(user_id, user);

    return res.status(200).send();
  } catch (error) {
    return res.status(400).send({ error })
  }
})

module.exports = app => app.use('/restaurants', router);