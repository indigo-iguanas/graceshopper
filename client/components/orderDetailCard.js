import React from 'react'
import Dinero from 'dinero.js'

const OrderDetailCard = ({items}) => {
  return (
    <table className="table is-bordered is-striped is-hoverable">
      <thead>
        <tr>
          <th>
            <abbr title="Name">Name</abbr>
          </th>
          <th>
            <abbr title="Item Image">Item</abbr>
          </th>
          <th>
            <abbr title="Price">Price</abbr>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => {
          const price = Dinero({
            amount: Number(item.emotion.price),
            currency: 'USD'
          }).toFormat('$0,0.00')
          return (
            <tr key={item.id}>
              <td>{item.emotion.name}</td>
              <td>
                <img
                  width="100"
                  src={item.emotion.imageUrl}
                  alt={item.emotion.name}
                />
              </td>
              <td>{`${price}`}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default OrderDetailCard
