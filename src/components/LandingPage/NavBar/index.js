import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../App"

import "./styles.css"

function NavBar({ user }) {
  const authContext = useContext(AuthContext)

  return (
    <div data-testid="navbar" className="nav-bar">
      <h1 className="logo">
        BallerStore
      </h1>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-x"></i>
      </label>
      <nav className="nav">
        <ul className="nav-list">
          {
            authContext.loggedInUser === null ?
            <Link className="nav-list-items" to="/auth/login">Login</Link>
            :
            <Link 
              className="nav-list-items" to="/" 
              onClick={authContext.logOutUser}>
              Logout
            </Link>
          }
          <Link className="nav-list-items" to="/">Home</Link>
          <Link className="nav-list-items" to="/balls">Shop</Link>
          <Link className="nav-list-items" to="/contacts">Contact</Link>
        </ul>
      </nav>
    </div>
  )
}   

export default NavBar