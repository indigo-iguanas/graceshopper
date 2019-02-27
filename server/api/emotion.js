const router = require('express').Router()
const Emotion = require('../db/models/emotions')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allEmotion = await Emotion.findAll()
    res.json(allEmotion)
  } catch (error) {
    next(error)
  }
})
