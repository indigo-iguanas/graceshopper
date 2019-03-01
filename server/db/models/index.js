const User = require('./user')
const Emotion = require('./emotions')
const LineItem = require('./lineItem')

LineItem.belongsTo(User)
User.hasMany(LineItem)

LineItem.belongsTo(Emotion)
Emotion.hasMany(LineItem)

module.exports = {
  User,
  Emotion,
  LineItem
}
