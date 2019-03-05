import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEmotionFromServer} from '../store/emotions'
import {addEmotionToCart} from '../store/cart'
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
    // a guest user will be signed up and logged in if one doesn't already exist on the session
    // hack: evt.target.name is the emotionId
    const emotionId = +evt.target.name
    const item = this.props.cart.cart.find(i => i.emotionId === emotionId)
    if (item === undefined) {
      this.props.addEmotionToCart(emotionId)
    } else {
      alert(`${item.emotion.name} is already in your cart.`)
    }
  }

  render() {
    return (
      <div>
        <ul className="container">
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
  cart: state.cart,
  emotions: state.emotions,
  loggedInUser: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchAllEmotions: () => dispatch(getEmotionFromServer()),
  addEmotionToCart: emotionId => dispatch(addEmotionToCart(emotionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Emotions)
