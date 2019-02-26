const {expect} = require('chai')
const db = require('../index')
const Emotion = db.model('emotion')

describe('Emotion model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Emotions ', () => {
    describe('correct attributes of name and imageUrl', () => {
      let emotion

      beforeEach(async () => {
        emotion = await Emotion.build({
          name: 'Saddness',
          imageUrl:
            'http://pluspng.com/img-png/png-sad-emoji-emoticon-sad-256.png'
        })
      })

      it('includes name attribute', () => {
        expect(emotion.name).to.be.equal('Saddness')
      })

      it('includes imageUrl attribute', () => {
        expect(emotion.imageUrl).to.be.equal(
          'http://pluspng.com/img-png/png-sad-emoji-emoticon-sad-256.png'
        )
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
