import { Link } from "react-router-dom"
import { firebaseSignUp } from "../../firebase/controllers/authControllers"
import "./signup.css" // email password and button container use styles from login.css

export default function Signup() {

  function handleSubmit (e) {
    e.preventDefault()
    firebaseSignUp(e.target)
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
            required
          />
        </div>

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
            minLength={8} 
            required
          />
        </div>

        <div 
          className="login-btn-container">
          <button 
            className="login-btn"
            type="submit">
            Sign up
          </button>
          <p className="ask-signup">
            Already have an account? <Link className="signup-link" to="/auth/login">Sign in</Link>
          </p>
        </div>

      </form>
    </div>
  )
}