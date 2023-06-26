import dunkSVG from "./assets/Basketball-pana.svg";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login () {
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
            <p className="ask-signup">
              Don't have an account? <Link className="signup-link" to="/auth/signup">Sign up</Link>
            </p>
          </div>

        </form>
      </div>

    </div>
  )
}