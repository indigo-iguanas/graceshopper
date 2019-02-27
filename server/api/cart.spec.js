/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
