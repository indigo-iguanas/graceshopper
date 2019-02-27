import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEmotionFromServer} from '../store/emotions'

class Emotions extends Component {
  constructor() {
    super()
  }

  // componentDidMount() {
  //   this.props.fetchAllEmotions()
  // }

  render() {
    return (
      <div>
        Select desired emotion:
        <ul>
          <li>Emotions</li>
        </ul>
        {/* {
          this.props.emotions.map(emotion => {
          <ul key={emotion.id}>
          return (
            <li>Emotion{emotion.name}</li>
            )
          </ul>
          })
        } */}
      </div>
    )
  }
}

// export default Emotions

const mapStateToProps = state => ({
  emotions: state.emotions
})

const mapDispatchToProps = dispatch => ({
  fetchAllEmotions: () => dispatch(getEmotionFromServer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Emotions)
