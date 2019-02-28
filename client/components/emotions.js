import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEmotionFromServer} from '../store/emotions'
import EmotionCard from './emotionCard'

class Emotions extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchAllEmotions()
  }

  render() {
    return (
      <div>
        <div className="logo">Emotions R Us!!!!!!!!</div>
        <ul>
          {this.props.emotions.emotions.map(emotion => {
            return <EmotionCard key={emotion.id} emotion={emotion} />
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  emotions: state.emotions
})

const mapDispatchToProps = dispatch => ({
  fetchAllEmotions: () => dispatch(getEmotionFromServer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Emotions)
