/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Emotion = require('../db/models/emotions')

describe('All emotion routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/emotion', () => {
    const testEmotion = 'Ennui'
    const imageUrl =
      'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png'

    beforeEach(() => {
      return Emotion.create({
        name: testEmotion
      })
    })

    it('GET /api/emotion', async () => {
      const res = await request(app)
        .get('/api/emotion')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(testEmotion)
      expect(res.body[0].imageUrl).to.be.equal(imageUrl)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
