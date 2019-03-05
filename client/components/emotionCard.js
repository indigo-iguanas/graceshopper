import React from 'react'
import Dinero from 'dinero.js'

const emotionCard = ({clickHandler, emotion}) => {
  const modelPrice = Number(emotion.price)
  const price = Dinero({amount: modelPrice, currency: 'USD'}).toFormat(
    '$0,0.00'
  )
  return (
    <div className="card has-text-centered">
      <div className="image is-75x75">
        <figure>
          <img src={emotion.imageUrl} alt={emotion.name} />
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-4">{emotion.name}</p>
        <em>
          <p>{`${price}`}</p>
        </em>
        <button
          className="button is-success"
          name={emotion.id}
          onClick={clickHandler}
          type="button"
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default emotionCard
