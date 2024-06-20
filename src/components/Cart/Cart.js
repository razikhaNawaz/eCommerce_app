
import React, { useContext } from "react";

import CartContext from "../../store/cart-context";

import "./Cart.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
 

  const removeItemHandler = (product) => {
    cartCtx.removeItem(product);
    
};
const cartList = cartCtx.items.map((product) => {
    return (
      <li key={product.id} className="cartitems">
        <span className="cart-col">
          <img src={product.imageUrl} alt={product.title} width="100px" />
          <span>{product.title}</span>
        </span>
        <span className="cart-col">
          <span>${product.price}</span>
        </span>
        <span className="cart-col">
          <span>Quantity:{product.quantity}</span>
          <button
            className="remove-item"
            onClick={() => removeItemHandler(product)}
          >
            Remove
          </button>
        </span>
      </li>
    );
  });
  let Total = 0;
  cartCtx.items.forEach((product) => {
    Total += Number(product.price * product.quantity);
  });

  return (
    <div className="cartbox">
      <button className="close-cart" onClick={props.onClose}>
        X
      </button>
      <div className="headings">
        <div>ITEM</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
      </div>
      <div className="cartdetails">{cartList}</div>;
      <div className="total-price">Total: ${Total}</div>
    </div>
  );
};

export default Cart;