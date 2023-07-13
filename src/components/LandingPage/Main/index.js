 import { Link } from "react-router-dom";
 import { useContext } from "react";
 import { AuthContext } from "../../App";
 import basketBallPic from "../images/gettyimages-490313359-612x612.jpg"
import "./styles.css"

export default function Main() {

  const authContext = useContext(AuthContext)

  return(
    <div className="main">
      <div data-testid="landing" className="top-section">
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
                Explore Collection
              </button>
            </Link>
          }
        </div>
      </div>
      <section className="brand-story-container">
        <div className="write-up-container-2">
          <h1>#1 Basketball Store</h1>
          <p className="brand-story-1">
            Discover the difference quality makes. Explore our collection, choose the ball that resonates with your passion
          </p>
          <p className="brand-story-2">
            At BallerStore, we believe that every aspiring athlete, no matter their skill level, deserves access to high-quality basketballs that can truly enhance their performance.
          </p>
          <div className="random-basketball-icons">
            <i className="fa-solid fa-basketball" id="ball-1"></i>
            <i className="fa-solid fa-basketball" id="ball-2"></i>
          </div>
        </div>
        <img
          className="dunking-guy-image"
          src={basketBallPic}
          alt="baller"
          loading="lazy"
         />
      </section>
    </div>
  )
}