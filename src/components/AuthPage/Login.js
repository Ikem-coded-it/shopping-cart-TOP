import dunkSVG from "./assets/Basketball-pana.svg";
import { Link, useNavigate } from "react-router-dom";
import { firebaseSignIn, googleSignin } from "../../firebase/controllers/authControllers";
import { AuthContext } from "../App";
import { useContext } from "react";
import "./login.css";

export default function Login () {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const user = firebaseSignIn(e.target)
    authContext.setLoggedInUser(user);
    navigate("/balls")
  }

  async function handleGoogleSignIn () {
    const user = await googleSignin()
    authContext.setLoggedInUser(user)
    navigate("/balls")
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
            <button 
              className="login-btn"
              type="submit">
              Login
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