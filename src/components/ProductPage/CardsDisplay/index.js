import BrandContainer from "../Brand"
import { 
  useState, 
  useEffect, 
  useContext,
} from "react"
import { Link } from "react-router-dom";
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

function Result({ title, id }) {
  const ballPageLink = `/balls/${title}/${id}`
  return (
    <Link 
      to={ballPageLink}
      className="search-result">
      {title}
    </Link>
  )
}

export default function CardsDisplay() {
  const [spaldingBalls, setSpaldingBalls] = useState([])
  const [wilsonBalls, setWilsonBalls] = useState([])
  const [moltenBalls, setMoltenBalls] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
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
        const fetchedSpalding = await fetchAllSpaldingBalls()
        const fetchedWilson = await fetchAllWilsonBalls()
        const fetchedMolten = await fetchAllMoltenBalls()

        //set balls state
        setSpaldingBalls(fetchedSpalding)
        setWilsonBalls(fetchedWilson)
        setMoltenBalls(fetchedMolten)

        // set ball names and id for search filtering
        const filter = []
        fetchedSpalding.forEach(ball => {
          const filterObject = {title: ball.data.title, id: ball.id}
          filter.push(filterObject)
        })

         fetchedWilson.forEach(ball => {
          const filterObject = {title: ball.data.title, id: ball.id}
          filter.push(filterObject)
        })

         fetchedMolten.forEach(ball => {
          const filterObject = {title: ball.data.title, id: ball.id}
          filter.push(filterObject)
        })

        setSearchResults(filter)
      }
    }
    setBalls()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.loggedInUser])

  function handleSearch(e) {
    const query = e.target.value
    if (query === '') {
      setFilteredResults([])
      return
    }
    const matches = [...searchResults].filter(result => {
      return result.title.toLowerCase().includes(query.toLowerCase())
    })
    setFilteredResults(matches.slice(0, 7))
  }

  return (
    <div 
      data-testid="cards-display"
      className="card-display">

        {
          authContext.loggedInUser !== null ?
          <>
            <div className="search-container">
              <div className="search-bar">
                <div className="search-icon-container">
                  <i className="fa-solid fa-search"></i>
                </div>
                <input
                  onChange={e => handleSearch(e)}
                  type="search"
                  placeholder="search"
                />
              </div>
              <div className="search-results-container">
                {
                  filteredResults.map(result => {
                    return <Result title={result.title} id={result.id} />
                  })
                }
              </div>
            </div>
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