const Sequelize = require('sequelize')
const db = require('../db')

const Emotion = db.define('emotion', {
  name: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png'
  }
})

module.exports = Emotion
