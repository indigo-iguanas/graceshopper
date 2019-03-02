const router = require('express').Router()
const {Order} = require('../db/models/index.js')
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
