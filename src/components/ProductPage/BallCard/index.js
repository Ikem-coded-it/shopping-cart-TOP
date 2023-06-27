import { useContext, useRef } from "react"
import { Link } from "react-router-dom";
import CartContext from "../Context/cartContext"
import "./styles.css"

export default function BallCard({ src, title, price }) {
  const cartContext = useContext(CartContext)
  const quantityInput = useRef()
  const image = useRef()
  const ballPrice = useRef()
  const duplicate = useRef(false)

  const handleCartUpdate = () => {
    const cartItem = {
      title: title,
      imageSrc: image.current.src,
      price: ballPrice.current.innerText,
      qty: quantityInput.current.value,
    }
    if (cartItem.qty === "") cartItem.qty = 1

    if (cartContext.cartItems.length === 0) {
      cartContext.setCartItems([
        ...cartContext.cartItems, cartItem
      ])

    } else {
        cartContext.cartItems.forEach((item, index) => {
          if (item.title === cartItem.title) {
            duplicate.current = true
   
            // update the cart item by increasing its qty
            const newItem = {
              title: item.title,
              imageSrc: item.imageSrc,
              price: item.price,
              qty: parseInt(item.qty) + parseInt(quantityInput.current.value === "" ?
                                         1 :
                                        quantityInput.current.value),
            }

            const cartItemsDuplicate = [...cartContext.cartItems]
            const updatedCartItem = cartItemsDuplicate.with(index, newItem)
            cartContext.setCartItems(updatedCartItem)
            return
          }
        })

        if (duplicate.current === false)
          cartContext.setCartItems([...cartContext.cartItems, cartItem])
      }
  }

  const ballPageLink = `/balls/${title}`;

  return (
    <div 
      data-testid="ball-card"
      className="ball-card">
      <img 
        ref={image}
        className="ball-image" 
        src={src} 
        alt="ball"
        loading="lazy"
      /> 
      <Link 
        id="ballcard-link"
        to="/balls/ball">
        <span>
          {title}
        </span>
      </Link>
      <div 
        className="input-price-container">
        <span 
          className="price"
          ref={ballPrice}>
          ${price}
        </span>
        <input 
          data-testid="qty-input"
          name="quantity"
          ref={quantityInput} 
          type="number" 
          min={1}
          max={10}
          placeholder={1}
        />
      </div>
      <button
        className="make-basket-btn"
        onClick={() => handleCartUpdate()}>
        Make the basket
      </button>
    </div>
  )
}