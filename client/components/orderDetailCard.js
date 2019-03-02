import React, {Component} from 'react'

const OrderDetailCard = props => {
  return (
    <div>
      <li>
        <p>{`UserId: ${props.order.userId}`}</p>
        <p>{`OrderId: ${props.order.id}`}</p>
      </li>
    </div>
  )
}

export default OrderDetailCard
