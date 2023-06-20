import { useContext, useRef } from "react"
import CartContext from "../Context/cartContext"
import "./styles.css"

export default function BallCard({ src, title, price, id }) {
  const cartContext = useContext(CartContext)
  const quantityInput = useRef()
  const image = useRef()
  const ballPrice = useRef()

  const handleCartUpdate = (e) => {
    const ballId = id

    const cartItem = {
      id: ballId,
      imageSrc: image.current.src,
      price: ballPrice.current.innerText,
      qty: quantityInput.current.value,
    }

    cartContext.cartItems.forEach((item, index) => {
      if (item.id === cartItem.id) {
        const newItem = {
          id: item.id,
          imageSrc: item.imageSrc,
          price: item.price,
          qty: item.qty + 1,
        }
        // const cartItemsDuplicate = [...cartContext.cartItems]
        const updatedCartItem = cartContext.cartItems.with(index, newItem)
        cartContext.setCartItems(updatedCartItem)
        return
      }
    })

    cartContext.setCartItems([...cartContext.cartItems, cartItem])
  }

  return (
    <div 
      className="ball-card">
      <img 
        ref={image}
        className="ball-image" 
        src={src} 
        alt="ball"
      /> 
      <span>
        {title}
      </span>
      <div 
        className="input-price-container">
        <span 
          ref={ballPrice}>
          ${price}
        </span>
        <input 
          ref={quantityInput} 
          type="number" 
          min={1}
          placeholder={0}
        />
      </div>
      <button
        onClick={(e) => handleCartUpdate(e)}>
        Make the basket
      </button>
    </div>
  )
}