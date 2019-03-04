const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')

    describe('convertToRegisteredUser', () => {
      let cody, guest, guestPassword

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
        guest = await User.create({
          isGuest: true
        })
        guestPassword = 'smushPie'
      })

      it('returns false if user is not a guest', () => {
        expect(cody.isGuest()).to.be.equal(false)
        expect(cody.convertToRegisteredUser(guestPassword)).to.be.equal(false)
        expect(cody.isGuest()).to.be.equal(false)
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns true if it converted a guest to a registered user', () => {
        expect(guest.isGuest()).to.be.equal(true)
        expect(guest.convertToRegisteredUser(guestPassword)).to.be.equal(true)
        expect(guest.isGuest()).to.be.equal(false)
        expect(guest.correctPassword(guestPassword)).to.be.equal(true)
        expect(guest.correctPassword(guestPassword + 'z')).to.be.equal(false)
      })
    }) // end describe('convertToRegisteredUser')
  }) // end describe('instanceMethods')
}) // end describe('User model')
