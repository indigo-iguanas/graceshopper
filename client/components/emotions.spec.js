/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
//import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

import Emotions from './emotions.js'

const adapter = new Adapter()
enzyme.configure({adapter})

xdescribe('Emotions', () => {
  let emotions
  let store
  //let mockAxios
  let initialState = {
    emotions: []
  }

  beforeEach(() => {
    //mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    emotions = shallow(<Emotions store={store} />)
  })

  afterEach(() => {
    //mockAxios.restore()
    store.clearActions()
  })

  it('renders the emotions in an ul tag', () => {
    //TODO console.log(`${emotions.debug()}`)
    //TODO console.log(emotions.getDOMNode())
    expect(emotions.find('ul')).to.have.lengthOf(1)
  })
})
