/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getEmotionFromServer} from './emotions'
//emotions, reducer,
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
// import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {emotions: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  xdescribe('getEmotionFromServer', () => {
    it('eventually dispatches the GET_EMOTIONS action', async () => {
      const fakeEmotions = [
        {name: 'Happy', imageUrl: 'http://example.com/happiness.png'},
        {name: 'Sad', imageUrl: 'http://example.com/sad.png'}
      ]
      mockAxios.onGet('/api/emotions').replyOnce(200, fakeEmotions)
      await store.dispatch(getEmotionFromServer())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_EMOTIONS')
      expect(actions[0].emotions).to.be.deep.equal(fakeEmotions)
    })
  })
})
