import { Routes, Route } from "react-router-dom" 
import LandingPage from "../Pages/LandingPage";
import NavBar from "./LandingPage/NavBar";
import Footer from "./LandingPage/Footer";
import BallsPage from "../Pages/BallsPage";
import ContactsPage from "../Pages/ContactPage";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import BallPage from "../Pages/BallPage";
import AdminPage from "../Pages/AdminPage";
import { 
  createContext, 
  useState, 
  useEffect, 
  useReducer 
} from "react"
import { firebaseSignOut } from "../firebase/controllers/authControllers";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import cartReducer from "./ProductPage/CartLogic";
import { getCart } from "../firebase/controllers/dbController";
import CartContext from "./ProductPage/CartLogic/cartContext";
import './App.css';

const AuthContext = createContext(0)
const initialState = null

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [cartItems, dispatch] = useReducer(cartReducer, initialState)
  const [cartNumber, setCartNumber] = useState(0)

  useEffect(() => {
     onAuthStateChanged(auth, async(user) => {
      if (user) {
        setLoggedInUser(user)
        const { cart } = await getCart(user.uid)
        dispatch({type: "added", cart})
      } else  {
        setLoggedInUser(null)
      }
    });
  }, [])


  const logOutUser = async () => {
    await firebaseSignOut()
    await setLoggedInUser(null)
  }

  const authContextValues = {
    loggedInUser: loggedInUser,
    logOutUser: logOutUser,
    setLoggedInUser: setLoggedInUser,
  }

  const cartContextValues = {
    cartNumber: cartNumber,
    setCartNumber: setCartNumber,
    cartItems: cartItems,
    cartDispatch: dispatch,
  }

  return(
    <>
    <AuthContext.Provider value={authContextValues}>
       <CartContext.Provider value={cartContextValues}>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {
            cartItems &&
            <>
              <Route path="/balls">
                <Route index element={<BallsPage />} />
                <Route path=":title/:id" element={<BallPage />} />
              </Route>
            </>
          }  

          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
        <Footer />
       </CartContext.Provider>
    </AuthContext.Provider>
    </>
  )
}

export {AuthContext}