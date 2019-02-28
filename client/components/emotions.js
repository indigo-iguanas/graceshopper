import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEmotionFromServer, postEmotionsToCartModel} from '../store/emotions'
import EmotionCard from './emotionCard'

class Emotions extends Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllEmotions()
  }

  clickHandler(evt) {
    //evt.target.name is the emotionId
    this.props.addEmotionToCart(evt.target.name)
  }

  render() {
    return (
      <div>
        <div className="logo">Emotions R Us</div>
        <ul>
          {this.props.emotions.emotions.map(emotion => {
            return (
              <EmotionCard
                clickHandler={this.clickHandler}
                key={emotion.id}
                emotion={emotion}
              />
            )
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
  fetchAllEmotions: () => dispatch(getEmotionFromServer()),
  addEmotionToCart: emotionId => dispatch(postEmotionsToCartModel(emotionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Emotions)
