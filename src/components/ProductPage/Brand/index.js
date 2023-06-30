import BallCard from "../BallCard"
import {v4 as uuidv4} from "uuid";
import "./styles.css"

export default function BrandContainer({ brand, cards }) {
  return (
    <div 
      className="brand-container">
      <h1 className="brand-name">
        {brand}
      </h1>
      <p className="brand-description">Check out our {brand} basketballs</p>
      <div className="ball-cards-container">
        {
          cards.map((card, index) => {
            return (
              <BallCard
                key={uuidv4()}
                src={card.data.src}
                title={card.data.title}
                price={card.data.price}
                ballId={card.id}
              />
            )
          })
        }
      </div>
    </div>
  )
}