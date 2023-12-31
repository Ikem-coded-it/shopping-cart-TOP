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
import NotFoundPage from "../Pages/NotfoundPage";
import { 
  createContext, 
  useState,
  useReducer 
} from "react"
import { firebaseSignOut } from "../firebase/controllers/authControllers";
import cartReducer from "./ProductPage/CartLogic";
import CartContext from "./ProductPage/CartLogic/cartContext";
import './App.css';

const AuthContext = createContext(0)
const initialState = []

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [cartItems, dispatch] = useReducer(cartReducer, initialState)
  const [cartNumber, setCartNumber] = useState(0)


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
          <Route path="/balls">
            <Route index element={<BallsPage />} />
            <Route path=":title/:id" element={<BallPage />} />
          </Route>
          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
       </CartContext.Provider>
    </AuthContext.Provider>
    </>
  )
}

export {AuthContext}