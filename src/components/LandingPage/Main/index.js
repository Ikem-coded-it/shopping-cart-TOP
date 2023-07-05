 import { Link } from "react-router-dom";
 import { useContext } from "react";
 import { AuthContext } from "../../App";
 import ReactLoading from "react-loading";
import "./styles.css"

export default function Main() {

  const authContext = useContext(AuthContext)

  return(
    <div data-testid="landing" className="main-background">
      <div className="write-up-container">
        <div className="write-up">
          <div className="welcome">Welcome</div>
          <div className="to">to</div>
          <div className="baller-store">BallerStore</div>
          <div className="para">Ready to take your game to the next level?</div>
        </div>
        {
          authContext.loggedInUser !== null ?
          <Link 
            className="link" 
            to="/balls">
            <button>
              Get Some Balls
            </button>
          </Link>
           :
          <Link 
            className="link" 
            to="/auth/login">
            <button>
              Get Some Balls
            </button>
          </Link>
        }
      </div>
    </div>
  )
}