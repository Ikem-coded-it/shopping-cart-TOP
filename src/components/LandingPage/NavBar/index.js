import "./styles.css"

function NavBar() {
  return (
    <div className="nav-bar">
      <h1 className="logo">
        BallerStore
      </h1>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-list-items">Home</li>
          <li className="nav-list-items">Blog</li>
          <li className="nav-list-items">Contact</li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar