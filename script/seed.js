'use strict'

const db = require('../server/db')
const {User, Emotion, LineItem, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const emotions = await Promise.all([
    Emotion.create({
      name: 'happiness',
      imageUrl:
        'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/smiling-face.png',
      price: 100
    }),
    Emotion.create({
      name: 'sadness',
      imageUrl:
        'https://img.washingtonpost.com/news/morning-mix/wp-content/uploads/sites/21/2015/06/sleepy-face.png',
      price: 140
    }),
    Emotion.create({
      name: 'ennui',
      imageUrl: 'http://emojiry.com/wp-content/uploads/2017/03/1f620.png',
      price: 150
    }),
    Emotion.create({
      name: 'waxing wroth',
      imageUrl:
        'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/pouting-face.png',
      price: 165
    }),
    Emotion.create({
      name: 'joy',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmh6MHYXudMU3JOkzPQJa2I3Y2UxvXqlKqfRJHsVT0pBv3DGF41g',
      price: 500
    }),
    Emotion.create({
      name: 'purring',
      imageUrl:
        'https://66.media.tumblr.com/4c224c88783085d52f9d1544935a9466/tumblr_inline_pikz8cLj4n1sx6sgb_1280.png',
      price: 10000
    }),
    Emotion.create({
      name: 'aggravation',
      imageUrl:
        'https://jcdunnvox.files.wordpress.com/2017/11/exploding-head-emoji.jpeg',
      price: 150000
    })
  ])

  const orders = await Promise.all([
    Order.create({
      userId: users[0].id,
      subTotal: emotions[0].price
    }),
    Order.create({
      userId: users[1].id,
      subTotal: Number(emotions[0].price) + Number(emotions[1].price)
    })
  ])

  const now = new Date()

  const lineItem = await Promise.all([
    // an unpurchased cart
    LineItem.create({
      userId: users[0].id,
      emotionId: emotions[0].id
    }),
    LineItem.create({
      userId: users[0].id,
      emotionId: emotions[1].id
    }),
    LineItem.create({
      userId: users[0].id,
      emotionId: emotions[2].id
    }),

    // a purchased order
    LineItem.create({
      userId: users[1].id,
      emotionId: emotions[0].id,
      orderId: orders[0].id,
      date: now,
      status: 'purchased'
    }),
    LineItem.create({
      userId: users[1].id,
      emotionId: emotions[0].id,
      orderId: orders[0].id,
      date: now,
      status: 'purchased'
    }),
    LineItem.create({
      userId: users[1].id,
      emotionId: emotions[1].id,
      orderId: orders[0].id,
      date: now,
      status: 'purchased'
    }),
    LineItem.create({
      userId: users[1].id,
      emotionId: emotions[2].id,
      orderId: orders[0].id,
      date: now,
      status: 'purchased'
    })
  ])

  console.log(
    `seeded ${users.length} users ${emotions.length} emotions ${
      lineItem.length
    } lineItems`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
