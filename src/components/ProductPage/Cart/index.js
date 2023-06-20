import { useRef, useContext } from "react";
import CartContext from "../Context/cartContext";
import {v4 as uuidv4} from "uuid";
import "./styles.css";

export default function Cart () {
  const cartModal = useRef()
  const cartModalOpen = useRef()
  const cartModalClose = useRef()
  const cartContext = useContext(CartContext)

  const handleCartOpen = () => {
    cartModal.current.showModal()
  }

  const handleCartClose = () => {
    cartModal.current.close()
  }

  return (
    <div className="cart">

      <div 
        ref={cartModalOpen} 
        className="shopping-cart-open"
        onClick={() => handleCartOpen()}>
        <div 
          className="count-display">
          {cartContext.cartNumber}
        </div>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>

      <dialog
        ref={cartModal} 
        className="cart-modal">
        <div className="cart-modal-inner">
          <i 
            ref={cartModalClose}
            className="fa-solid fa-x"
            onClick={() => handleCartClose()}
          ></i>
          <div 
            className="cart-items-display">
            {
              cartContext.cartItems.map(cartItem => {
                return (
                  <CartItemCard
                    key={uuidv4()}
                    src={cartItem.imageSrc}
                    qty={cartItem.qty}
                    price={cartItem.price}
                  />
                )
              })
            }
          </div>
          <div 
            className="checkout-btn-container">
            <div 
              className="total-price-display">
              Total: $00
            </div>
            <button 
              className="checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      </dialog>

    </div>
  )
}

function CartItemCard ({ src, qty, price }) {
  return (
    <div 
      className="cart-item-card">
      <img 
        className="cart-item-card-image"
        src={src} 
        alt="ball" 
      />
      <div 
        className="cart-item-controls-price-container">
        <div>
          {price}
        </div>
        <div 
          className="control">
          <div className="left-arrow-container">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div>
            {qty}
          </div>
          <div className="right-arrow-container">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  )
}