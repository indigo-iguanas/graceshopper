const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true // guests don't have email address
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  isGuest: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    // Making `.guest` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('isGuest')
    }
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  // Any password should be considered INcorrect for a guest...
  return (
    !this.isGuest() &&
    User.encryptPassword(candidatePwd, this.salt()) === this.password()
  )
}

User.prototype.convertToRegisteredUser = function(password) {
  if (!this.isGuest()) {
    return false
  } else {
    this.isGuest = false
    this.password = password
    // eslint-disable-next-line no-use-before-define
    setSaltAndPassword(this)
    return true
  }
}

User.prototype.getDisplayName = function() {
  if (this.isGuest()) {
    return 'Guest'
  } else {
    return this.email
  }
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  // guests don't get passwords
  if (!user.isGuest()) {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
    }
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
