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
import { createContext, useState, useEffect } from "react"
import { firebaseSignOut } from "../firebase/controllers/authControllers";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import './App.css';

const AuthContext = createContext(0)

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("checked logged in user")
        setLoggedInUser(user)
      } else  {
        setLoggedInUser(null)
      }
    });
  }, [loggedInUser])

  const logOutUser = async () => {
    await firebaseSignOut()
    await setLoggedInUser(null)
  }

  return(
    <>
    <AuthContext.Provider value={{
      loggedInUser: loggedInUser,
      logOutUser: logOutUser,
      setLoggedInUser: setLoggedInUser,
    }}>
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
      </Routes>
      <Footer />
    </AuthContext.Provider>
    </>
  )
}

export {AuthContext}