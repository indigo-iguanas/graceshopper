import React from 'react'

const emotionCard = props => {
  return (
    <div>
      <img
        width="100"
        src={props.emotion.imageUrl}
        alt="{props.emotion.name}"
      />
      <div>{props.emotion.name}</div>
    </div>
  )
}

export default emotionCard
