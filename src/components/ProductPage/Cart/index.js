import { useRef, useContext } from "react";
import CartContext from "../CartLogic/cartContext";
import {v4 as uuidv4} from "uuid";
import "./styles.css";

export default function Cart () {
  const cartModal = useRef()
  const cartModalOpen = useRef()
  const cartModalClose = useRef()
  const cartContext = useContext(CartContext)
  const cartItemsDuplicate = [...cartContext.cartItems]

  const handleCartOpen = () => {
    cartModal.current.showModal()
  }

  const handleCartClose = () => {
    cartModal.current.close()
  }

  return (
    <div 
      className="cart">

      <div 
        data-testid="cart-modal"
        ref={cartModalOpen} 
        className="shopping-cart-open"
        onClick={() => handleCartOpen()}>
        <div 
          data-testid="count-display"
          className="count-display">
          {
            cartItemsDuplicate.length &&
             cartItemsDuplicate.reduce(
              (prev, curr) => {
              return parseInt(curr.qty) + parseInt(prev)
            }, 0)
          }
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
              cartItemsDuplicate.length && 
              cartItemsDuplicate.map(cartItem => {
                return (
                  <CartItemCard
                    key={uuidv4()}
                    src={cartItem.imageSrc}
                    qty={cartItem.qty}
                    price={cartItem.price}
                    title={cartItem.title}
                  />
                )
              })
            }
          </div>
          <div 
            className="checkout-btn-container">
            <div 
              className="total-price-display">
              Total: ${
                cartItemsDuplicate.length &&
                 cartItemsDuplicate.reduce(
                  (prev, curr) => {
                  const priceNumber = curr.price.split("$")[1]
                  return prev + (priceNumber * curr.qty)
                }, 0)
              }
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

export function CartItemCard ({ src, qty, price, title }) {
  const cartContext = useContext(CartContext)

  async function handleIncrementQty () {
    const cart = [...cartContext.cartItems]
    cart.forEach(item => {
      if (item.title === title) {
        if (item.qty >= 10) return
        item.qty++
      }
    })
    cartContext.cartDispatch({type: "increased_qty", cart})
  }

  async function handleDecrementQty () {
    const cart = [...cartContext.cartItems]
    cart.forEach(item => {
      if (item.title === title) {
        if (item.qty <= 1) return
        item.qty--
      }
    })
    cartContext.cartDispatch({type: "decreased_qty", cart})
  }

  async function handleRemoveCartItem () {
    cartContext.cartDispatch({
      type: "removed", 
      cart: cartContext.cartItems,
      title,
    })
  }

  return (
    <div 
      className="cart-item-card">
      <i 
        onClick={() => handleRemoveCartItem()} 
        className="fa-solid fa-x remove-item-btn"
      ></i>
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
          <div 
            onClick={handleDecrementQty}
            className="left-arrow-container">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="qty-display">
            {qty}
          </div>
          <div 
            onClick={handleIncrementQty}
            className="right-arrow-container">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  )
}