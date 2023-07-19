import { Link, useNavigate } from "react-router-dom"
import { firebaseSignUp } from "../../firebase/controllers/authControllers"
import { AuthContext } from "../App"
import { useState, useContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase/config"
import LoadingSpinner from "../Loader"
import "./signup.css"

export default function Signup() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const [isRegistering, setIsRegistering] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    setIsRegistering(true) // engage loading spinner
    const user = await firebaseSignUp(e.target)

     // check if error and show error
    const errorDisplay = document.querySelector('#signup-error-display')
    if (user instanceof Error) {
      errorDisplay.textContent = user.message;
      errorDisplay.style.opacity = 1;
      setIsRegistering(false) // remove loading spinner
      return
    } else {
      errorDisplay.style.opacity = 0;
    }

    authContext.setLoggedInUser(user);

    // check if logged in then go to product page
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsRegistering(false)
        navigate("/balls")
      } 
    })
  }

  return (
    <div className="signup-form-container">
      <form 
        onSubmit={(e) => handleSubmit(e)}
        className="signup-form">
        <div 
          className="firstname-container">
          <label 
            className="firstname-label"
            htmlFor="firstname">
            First name
          </label>
          <input 
            className="firstname-input"
            type="text" 
            name="firstname"  
            placeholder="first name"
            minLength={2}
            maxLength={20}
            required
          />
        </div>

        <div 
          className="lastname-container">
          <label 
            className="lastname-label"
            htmlFor="lastname">
            Last name
          </label>
          <input 
            className="lastname-input"
            type="text" 
            name="lastname"  
            placeholder="last name"
            minLength={2}
            maxLength={20}
            required
          />
        </div>

        <div 
          className="signup-email-container">
          <label 
            className="signup-email-label"
            htmlFor="email">
            Email
          </label>
          <input 
            className="signup-email-input"
            type="email" 
            name="email"  
            placeholder="email"
            required
          />
        </div>

        <div 
          className="signup-password-container">
          <label 
            className="signup-password-label"
            htmlFor="password">
            Password
          </label>
          <input 
            className="signup-password-input"
            type="password" 
            name="password" 
            minLength={8} 
            placeholder="password"
            required
          />
        </div>

        <div 
          className="confirm-password-container">
          <label 
            className="confirm-password-label"
            htmlFor="confirmpassword">
            Confirm password
          </label>
          <input 
            className="confirm-password-input"
            type="password" 
            name="confirmpassword" 
            placeholder="confirm password"
            minLength={8} 
            required
          />
        </div>

        <div 
          className="signup-btn-container">
          <div id="signup-error-display"></div>
          {
            isRegistering ?
            <LoadingSpinner />
            :
            <button 
              className="register-btn"
              type="submit">
              Sign up
            </button>
          }
          <p className="ask-signup">
            Already have an account? <Link className="signup-link" to="/auth/login">Sign in</Link>
          </p>
        </div>

      </form>
    </div>
  )
}