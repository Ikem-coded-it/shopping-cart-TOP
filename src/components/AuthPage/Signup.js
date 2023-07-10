import { Link, useNavigate } from "react-router-dom"
import { firebaseSignUp } from "../../firebase/controllers/authControllers"
import "./signup.css" // email password and button container use styles from login.css

export default function Signup() {
  const navigate = useNavigate()
  function handleSubmit (e) {
    e.preventDefault()
    firebaseSignUp(e.target)
    navigate("/auth/login")
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
          className="login-btn-container">
          <button 
            className="register-btn"
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