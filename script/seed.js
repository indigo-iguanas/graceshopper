'use strict'

const db = require('../server/db')
const {User, Emotion} = require('../server/db/models')

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
        'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/smiling-face.png'
    }),
    Emotion.create({
      name: 'sadness',
      imageUrl:
        'https://img.washingtonpost.com/news/morning-mix/wp-content/uploads/sites/21/2015/06/sleepy-face.png'
    }),
    Emotion.create({
      name: 'ennui',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }),
    Emotion.create({
      name: 'waxing wroth',
      imageUrl:
        'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/pouting-face.png'
    }),
    Emotion.create({
      name: 'joy',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }),
    Emotion.create({
      name: 'purring',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }),
    Emotion.create({name: 'aggravation'})
  ])

  console.log(`seeded ${users.length} users`)
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
