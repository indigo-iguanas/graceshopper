import React from 'react'

const emotionCard = ({clickHandler, emotion}) => {
  console.log('******: ', typeof emotion.price)
  return (
    <div>
      <img width="100" src={emotion.imageUrl} alt={emotion.name} />
      <div>{emotion.name}</div>
      <div>{`$${emotion.price.slice(0, 4)}`}</div>
      <button type="button" name={emotion.id} onClick={clickHandler}>
        Add To Cart
      </button>
    </div>
  )
}

export default emotionCard
