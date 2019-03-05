const passport = require('passport')
const router = require('express').Router()
const GitHubStrategy = require('passport-github').Strategy
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

// if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
//   console.log('Github client ID / secret not found. Skipping Github OAuth.')
// }
// else {
//   const githubConfig = {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK
//   }

const strategy = new GitHubStrategy(
  {
    clientID: '3a0b2e55fe7d4d4ec051',
    clientSecret: 'e90829d3ecd297efca6db52a34048b775dc8f368',
    callbackURL: '/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({githubId: profile.id}, function(err, user) {
      return cb(err, user)
    })
  }
)

passport.use(strategy)

router.get('/', passport.authenticate('github', {scope: 'email'}))

router.get(
  '/callback',
  passport.authenticate('github', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
)
