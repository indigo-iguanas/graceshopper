const router = require('express').Router()
const {LineItem, Emotion} = require('../db/models/index.js')
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
      const [count, _rows] = await LineItem.update(
        {
          date: new Date(),
          status: 'purchased'
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
        res.status(204).end()
      }
    }
  } catch (err) {
    next(err)
  }
})
