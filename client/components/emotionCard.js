import React from 'react'

const emotionCard = ({clickHandler, emotion}) => {
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
          <p>{`$${emotion.price.slice(0, emotion.price.toString().length)}`}</p>
        </em>
        <button
          className="button is-success"
          type="button"
          name={emotion.id}
          onClick={clickHandler}
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default emotionCard
