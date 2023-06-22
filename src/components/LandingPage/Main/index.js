 import { Link } from "react-router-dom"
import "./styles.css"

export default function Main() {
  return(
    <div data-testid="landing" className="main-background">
      <div className="write-up-container">
        <div className="write-up">
          <div className="welcome">Welcome</div>
          <div className="to">to</div>
          <div className="baller-store">BallerStore</div>
          <div className="para">Ready to take your game to the next level?</div>
        </div>
        <Link className="link" to="/balls"><button>Get Some Balls</button></Link>
      </div>
    </div>
  )
}