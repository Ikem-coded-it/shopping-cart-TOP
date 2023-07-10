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
import { AuthContext } from "../../App";
import LoadingSpinner from "../../Loader";
import { getCart } from "../../../firebase/controllers/dbController";
import "./styles.css"

export default function CardsDisplay() {
  const [spaldingBalls, setSpaldingBalls] = useState([])
  const [wilsonBalls, setWilsonBalls] = useState([])
  const [moltenBalls, setMoltenBalls] = useState([])
  const cartContext = useContext(CartContext)
  const authContext = useContext(AuthContext)

  useEffect(() => {
     onAuthStateChanged(auth, async(user) => {
       if (user) {
        authContext.setLoggedInUser(user)
        const data = await getCart(user.uid)

        if (data.cart) { // cart already exists for old user
          cartContext.cartDispatch({
            type: "added", 
            cart: data.cart
          })
        } else if(data === "new_cart_created") { // if first time sign in, get newly created cart
          const {cart} = await getCart(user.uid)
          cartContext.cartDispatch({
            type: "added", 
            cart
          })
        }

      } else  {
        authContext.setLoggedInUser(null)
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const setBalls = async() => {
      if (authContext.loggedInUser !== null) {
        setSpaldingBalls(await fetchAllSpaldingBalls())
        setWilsonBalls(await fetchAllWilsonBalls())
        setMoltenBalls(await fetchAllMoltenBalls())
      }
    }
    setBalls()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.loggedInUser])

  return (
    <div 
      data-testid="cards-display"
      className="card-display">
        {
          authContext.loggedInUser !== null ?
          <>
            {cartContext.cartItems && <Cart/>}
            {
              spaldingBalls.length ?
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