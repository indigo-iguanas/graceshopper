const router = require('express').Router()
const {LineItem, Order, Emotion} = require('../db/models/index.js')
const sequelize = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const cartItems = await LineItem.findAll({
      where: {
        userId,
        status: 'inCart'
      },
      include: [{model: Emotion}]
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
    const lineItem = await LineItem.create({emotionId, userId})
    const emotion = await lineItem.getEmotion()
    lineItem.setDataValue('emotion', emotion)
    res.json(lineItem)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    if (
      !req.session.passport ||
      !req.session.passport.hasOwnProperty('user') ||
      req.body.userId.id !== req.session.passport.user
    ) {
      res.status(401).end()
    } else {
      const [count, order] = await sequelize.transaction(async t => {
        const order = await Order.create(
          {userId: req.body.userId.id},
          {transaction: t}
        )
        const [count, _rows] = await LineItem.update(
          {
            date: new Date(),
            status: 'purchased',
            orderId: order.id
          },
          {
            where: {
              userId: req.body.userId.id,
              status: 'inCart'
            }
          },
          {transaction: t}
        )
        return [count, order]
      })
      console.log('moo', count, order)
      if (count === 0) {
        res.status(412).json('No items in cart')
      } else {
        res.status(200).json({orderId: orderId})
      }
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id/:lineItemId', async (req, res, next) => {
  try {
    const userId = Number(req.params.id)
    const lineItemId = Number(req.params.lineItemId)
    if (
      !req.session.passport ||
      !req.session.passport.hasOwnProperty('user') ||
      userId !== req.session.passport.user
    ) {
      res.status(401).end()
    } else {
      await LineItem.destroy({
        where: {
          id: lineItemId,
          userId: userId,
          status: 'inCart'
        }
      })
      res.send()
    }
  } catch (err) {
    next(err)
  }
})
