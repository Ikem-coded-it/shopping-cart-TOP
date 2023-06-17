import {useState, useEffect, useRef} from "react"
import "./styles.css"

export default function Main() {
  const [background, setBackground] = useState("main-background")

  useEffect(() => {
    const screenWidth = window.innerWidth
    if (screenWidth < 600) {
      setBackground("main-background-mobile")
    }
  }, [])

  return(
    <div className={background}>
      <div className="write-up-container">
        <div className="write-up">
          <div className="welcome">Welcome</div>
          <div className="to">to</div>
          <div className="baller-store">BallerStore</div>
          <div className="para">Ready to take your game to the next level?</div>
        </div>
        <button>Get Some Balls</button>
      </div>
    </div>
  )
}