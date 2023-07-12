import dunkSVG from "./assets/Basketball-pana.svg";
import { Link, useNavigate } from "react-router-dom";
import { firebaseSignIn, googleSignin } from "../../firebase/controllers/authControllers";
import { AuthContext } from "../App";
import { useContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import LoadingSpinner from "../Loader";
import "./login.css";

export default function Login () {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoggingIn(true)
    const user = await firebaseSignIn(e.target)

    // check if error and show error
    const errorDisplay = document.querySelector('#error-display')
    if (user instanceof Error) {
      errorDisplay.textContent = user.message;
      errorDisplay.style.opacity = 1;
      setIsLoggingIn(false)
      return
    } else {
      errorDisplay.style.opacity = 0;
    }

    authContext.setLoggedInUser(user);

    // check if logged in then go to product page
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggingIn(false)
        navigate("/balls")
      } 
    })
  }

  async function handleGoogleSignIn () {
    const user = await googleSignin()
    authContext.setLoggedInUser(user)

    // check if logged in then go to product page
    onAuthStateChanged(auth, (user) => {
      user && navigate("/balls") 
    })
  }

  return (
    <div 
      className="login">

      <div 
        className="basketball-image">
        <img 
          className="dunk-pic" 
          src={dunkSVG} 
          alt="dunk" 
          loading="lazy"
        />
      </div>

      <div className="form-container">
        <form 
          onSubmit={(e) => handleSubmit(e)}
          className="login-form">

          <div 
            className="email-container">
            <label 
              className="email-label"
              htmlFor="email">
              Email
            </label>
            <input 
              className="email-input"
              type="email" 
              name="email"  
              required
            />
          </div>

          <div 
            className="password-container">
            <label 
              className="password-label"
              htmlFor="password">
              Password
            </label>
            <input 
              className="password-input"
              type="password" 
              name="password" 
              minLength={8} 
              required
            />
          </div>

          <div 
            className="login-btn-container">
            <div id="error-display"></div>
            <button 
              className="login-btn"
              type="submit">
              Login
              {
                isLoggingIn === true &&
                <LoadingSpinner />
              }
            </button>
          </div>
        </form>
        <div
          className="google-auth-container">
          <button
            onClick={handleGoogleSignIn}
            className="google-login-btn">
            <i className="fa-brands fa-google"></i>
          </button>
          <p className="ask-signup">
              Don't have an account? <Link className="signup-link" to="/auth/signup">Sign up</Link>
          </p>
        </div>
      </div>

    </div>
  )
}