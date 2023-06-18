import "./styles.css"

export default function BallCard({ src, title, price }) {
  return (
    <div className="ball-card">
      <img className="ball-image" src={src} alt="ball"/> 
      <span>
        {title}
      </span>
      <div className="input-price-container">
        <span>${price}</span>
        <input type="number" min={1} />
      </div>
      <button>Make the basket</button>
    </div>
  )
}