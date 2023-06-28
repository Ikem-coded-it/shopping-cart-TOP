import BrandContainer from "../Brand"
import { useState, useEffect } from "react"
import { 
  fetchAllSpaldingBalls,
  fetchAllWilsonBalls,
  fetchAllMoltenBalls,
} from "../../../firebase/controllers/dbController";
import Cart from "../Cart"
import CartContext from "../Context/cartContext"
import "./styles.css"

export default function CardsDisplay() {
  const [cartItems, setCartItems] = useState([])
  const [cartNumber, setCartNumber] = useState(0)
  const [spaldingBalls, setSpaldingBalls] = useState([])
  const [wilsonBalls, setWilsonBalls] = useState([])
  const [moltenBalls, setMoltenBalls] = useState([])

  useEffect(() => {
     
    async function setBalls () {
      setSpaldingBalls([...spaldingBalls].concat(await fetchAllSpaldingBalls()))
      setWilsonBalls([...wilsonBalls].concat(await fetchAllWilsonBalls()))
      setMoltenBalls([...moltenBalls].concat(await fetchAllMoltenBalls()))
    }

    setBalls()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contextValues = {
    cartNumber: cartNumber,
    setCartNumber: setCartNumber,
    cartItems: cartItems,
    setCartItems: setCartItems,
  }

  return (
    <div 
      data-testid="cards-display"
      className="card-display">
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