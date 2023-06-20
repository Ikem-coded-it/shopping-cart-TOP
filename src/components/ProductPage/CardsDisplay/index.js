import BrandContainer from "../Brand"
import { useState } from "react"
import { 
  spaldingBalls,
  wilsonBalls,
  moltenBalls
} from "../images/index"
import Cart from "../Cart"
import CartContext from "../Context/cartContext"
import "./styles.css"

export default function CardsDisplay() {
  const [cartItems, setCartItems] = useState([])
  const [cartNumber, setCartNumber] = useState(0)

  const contextValues = {
    cartNumber: cartNumber,
    setCartNumber: setCartNumber,
    cartItems: cartItems,
    setCartItems: setCartItems,
  }

  return (
    <div className="card-display">
      <CartContext.Provider value={contextValues}>
        <Cart/>
        <BrandContainer 
          cards={spaldingBalls} 
          brand="Spalding"
        />
        <BrandContainer 
          cards={wilsonBalls} 
          brand="Wilson" 
        />
        <BrandContainer 
          cards={moltenBalls} 
          brand="Molten" 
        />
      </CartContext.Provider>
    </div>
  )
}