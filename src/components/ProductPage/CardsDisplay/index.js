import BrandContainer from "../Brand"
import { 
  spaldingBalls,
  wilsonBalls,
  moltenBalls
} from "../images/index"
import "./styles.css"

export default function CardsDisplay() {
  return (
    <div className="card-display">
      <div className="shopping-cart">
        <div className="count-display">0</div>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>
      <BrandContainer 
        cards={spaldingBalls} 
        brand="Spalding"
      />
      <BrandContainer 
        cards={wilsonBalls} 
        brand="Wilson" 
      />
      <BrandContainer 
        cards={moltenBalls} 
        brand="Molten" 
      />
    </div>
  )
}