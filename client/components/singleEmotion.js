import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleEmotionFromServer} from '../store/emotions'

class SingleEmotion extends Component {
  constructor() {
    super()
  }
  render() {
    return <div>Emotion selected: ...</div>
  }
}

const mapStateToProps = state => ({
  SingleEmotions: state.reducer.singleEmotion
})

const mapDispatchToProps = dispatch => ({
  fetchSingleEmotions: id => dispatch(getSingleEmotionFromServer(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleEmotion)
