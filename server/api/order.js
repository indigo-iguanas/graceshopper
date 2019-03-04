const router = require('express').Router()
const {Order, LineItem, Emotion} = require('../db/models/index.js')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.passport || !req.session.passport.hasOwnProperty('user')) {
      res.status(401).end()
    } else {
      const UserOrders = await Order.findAll({
        where: {userId: req.session.passport.user}
      })
      res.json(UserOrders)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/purchasedItems', async (req, res, next) => {
  try {
    if (!req.session.passport || !req.session.passport.hasOwnProperty('user')) {
      res.status(401).end()
    } else {
      const UserPurchaseItems = await LineItem.findAll({
        where: {userId: req.session.passport.user, status: 'purchased'},
        include: {model: Emotion}
      })
      res.json(UserPurchaseItems)
    }
  } catch (error) {
    next(error)
  }
})
