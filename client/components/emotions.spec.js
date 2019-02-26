/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Emotions from './Emotions.js'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Emotions', () => {
  let emotions

  beforeEach(() => {
    emotions = shallow(<Emotions />)
  })

  it('renders the emotions in an ul tag', () => {
    expect(emotions.find('ul'))
  })
})
