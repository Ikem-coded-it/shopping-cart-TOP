import { Link } from "react-router-dom"

import "./styles.css"

function NavBar() {
  return (
    <div data-testid="navbar" className="nav-bar">
      <h1 className="logo">
        BallerStore
      </h1>
      <nav className="nav">
        <ul className="nav-list">
          <Link className="nav-list-items" to="/">Home</Link>
          <Link className="nav-list-items" to="/balls">Shop</Link>
          <Link className="nav-list-items" to="/contacts">Contact</Link>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar