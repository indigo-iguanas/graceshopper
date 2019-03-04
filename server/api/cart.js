const router = require('express').Router()
const {LineItem, Order, Emotion} = require('../db/models/index.js')
module.exports = router

const userCheck = (session, currentUser) => {
  console.log('userCheck', currentUser, session.user, session)
  const user = currentUser.hasOwnProperty('userId')
    ? currentUser.userId.id
    : currentUser
  return session && session.hasOwnProperty('user') && +user === +session.user
}

router.get('/:id', async (req, res, next) => {
  console.log('GET :id', req.session)
  try {
    const userId = req.params.id
    if (!userCheck(req.session.passport, userId)) {
      res.status(401).end()
    } else {
      const cartItems = await LineItem.findAll({
        where: {
          userId,
          status: 'inCart'
        },
        include: [{model: Emotion}]
      })
      res.json(cartItems)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (
      !req.session ||
      !req.session.passport ||
      !req.session.passport.hasOwnProperty('user')
    ) {
      res.status(401).end()
    } else {
      const userId = req.session.passport.user
      const emotionId = req.body.emotionId
      const lineItem = await LineItem.create({emotionId, userId})
      const emotion = await lineItem.getEmotion()
      lineItem.setDataValue('emotion', emotion)
      res.json(lineItem)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  console.log('put /', req.body)
  try {
    if (!userCheck(req.session.passport, req.body.userId)) {
      res.status(401).end()
    } else {
      // TODO - create order and update line items should be in a transaction
      const order = await Order.create({userId: req.body.userId.id})
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
        }
      )
      if (count === 0) {
        res.status(412).json('No items in cart')
      } else {
        res.status(200).json({orderId: order.id})
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
    if (!userCheck(req.session.passport, userId)) {
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
