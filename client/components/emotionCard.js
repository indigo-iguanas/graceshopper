import React from 'react'

const emotionCard = ({clickHandler, emotion}) => {
  return (
    <div>
      <img width="100" src={emotion.imageUrl} alt={emotion.name} />
      <div>{emotion.name}</div>
      <div>{`$${emotion.price.slice(0, emotion.price.toString().length)}`}</div>
      <button type="button" name={emotion.id} onClick={clickHandler}>
        Add To Cart
      </button>
    </div>
  )
}

export default emotionCard
