import React from "react";

function PassingToTransaction({ cartItem }) {
  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cartItem.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PassingToTransaction
