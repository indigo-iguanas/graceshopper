const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

xdescribe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Order should have correct user, emotion, date, and status', () => {
    let order
    const testDate = new Date()
    beforeEach(async () => {
      order = await Order.build({
        userId: 1,
        emotionId: 2,
        date: testDate
      })
    })

    it('includes a userId', () => {
      expect(order.userId).to.be.equal(1)
    })

    it('includes an emotionId', () => {
      expect(order.emotionId).to.be.equal(2)
    })

    it('includes a date', () => {
      expect(order.date).to.be.equal(testDate)
    })

    it('status should be "inCart"', () => {
      expect(order.status).to.be.equal('inCart')
    })
  })
})
