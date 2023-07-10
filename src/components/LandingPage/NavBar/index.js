import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../App"
import { useRef } from "react";

import "./styles.css"

function NavBar({ user }) {
  const authContext = useContext(AuthContext)
  const checkbox = useRef()

  function handleCloseSidebar() {
    checkbox.current.checked = false;
  }

  return (
    <div data-testid="navbar" className="nav-bar">
      <h1 className="logo">
        BallerStore
      </h1>
      <input ref={checkbox} type="checkbox" id="check" />
      <label htmlFor="check">
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-x"></i>
      </label>
      <nav className="nav">
        <ul className="nav-list">
          {
            authContext.loggedInUser === null ?
            <Link 
              className="nav-list-items" 
              to="/auth/login"
              onClick={handleCloseSidebar}>
              Login
            </Link>
            :
            <Link 
              className="nav-list-items" to="/" 
              onClick={authContext.logOutUser}>
              Logout
            </Link>
          }
          <Link className="nav-list-items" to="/" onClick={handleCloseSidebar}>Home</Link>
          <Link className="nav-list-items" to="/balls" onClick={handleCloseSidebar}>Shop</Link>
          <Link className="nav-list-items" to="/contacts" onClick={handleCloseSidebar}>Contact</Link>
        </ul>
      </nav>
    </div>
  )
}   

export default NavBar