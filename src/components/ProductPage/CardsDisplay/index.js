import BrandContainer from "../Brand"
import { 
  useState, 
  useEffect, 
  useContext,
} from "react"
import { 
  fetchAllSpaldingBalls,
  fetchAllWilsonBalls,
  fetchAllMoltenBalls,
} from "../../../firebase/controllers/dbController";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";
import Cart from "../Cart"
import CartContext from "../CartLogic/cartContext"
import LoadingSpinner from "../../Loader";
import "./styles.css"

export default function CardsDisplay() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [spaldingBalls, setSpaldingBalls] = useState([])
  const [wilsonBalls, setWilsonBalls] = useState([])
  const [moltenBalls, setMoltenBalls] = useState([])
  const cartContext = useContext(CartContext)

  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      user ? 
        setLoggedInUser(user) : 
        setLoggedInUser(null);
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

  return (
    <div 
      data-testid="cards-display"
      className="card-display">
        {
          loggedInUser !== null ?
          <>
            {cartContext.cartItems && <Cart/>}
            {
              moltenBalls.length ?
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
              :
              <LoadingSpinner />
            }
          </>
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