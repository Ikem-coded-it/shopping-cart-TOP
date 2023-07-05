import BrandContainer from "../Brand"
import { 
  useState, 
  useEffect, 
} from "react"
import { 
  fetchAllSpaldingBalls,
  fetchAllWilsonBalls,
  fetchAllMoltenBalls,
  getCart,
} from "../../../firebase/controllers/dbController";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";
import Cart from "../Cart"
import CartContext from "../Context/cartContext"
import "./styles.css"

export default function CardsDisplay() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [cartNumber, setCartNumber] = useState(0)
  const [spaldingBalls, setSpaldingBalls] = useState([])
  const [wilsonBalls, setWilsonBalls] = useState([])
  const [moltenBalls, setMoltenBalls] = useState([])

  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("checked logged in user for cards")
        setLoggedInUser(user)
      } else  {
        setLoggedInUser(null)
      }
    });
  })

  useEffect(() => {
    const setBalls = async() => {
      if (loggedInUser !== null) {
        setSpaldingBalls(await fetchAllSpaldingBalls())
        setWilsonBalls(await fetchAllWilsonBalls())
        setMoltenBalls(await fetchAllMoltenBalls())
      }
    }
    setBalls()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser])

  useEffect(() => {
    const setCart = async() => {
      if (loggedInUser !== null) {
        const {uid} = loggedInUser;
        const { cart } = await getCart(uid)
        setCartItems([...cart])
      }
    }
    setCart()
  }, [loggedInUser])

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
        {
          loggedInUser !== null ?
          <CartContext.Provider value={contextValues}>
            {cartItems && <Cart/>}
            {
              moltenBalls.length &&
              <>
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
              </>
            }
          </CartContext.Provider>
           :
          <h1 style={{
            position: "absolute",
            top: "20px",
            color: "#ef4444",
            }}>
            Login to view balls
          </h1>
        }
    </div>    
  )
}