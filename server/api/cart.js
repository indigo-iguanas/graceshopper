const router = require('express').Router()
const {Order} = require('../db/models/index.js')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const cartItems = await Order.findAll({
      where: {
        userId,
        status: 'inCart'
      }
    })
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const emotionId = req.body.emotionId
    const order = await Order.create({emotionId, userId})
    res.json(order)
  } catch (err) {
    next(err)
  }
})
