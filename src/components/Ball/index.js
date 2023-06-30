import { 
  useRef, 
  useEffect, 
  useState,
} from "react";
import { fetchSingleBall } from "../../firebase/controllers/dbController";
import { Link, useParams } from "react-router-dom";
import image from "../ProductPage/images/spalding/96500475e5b6afc0ffb0628da646a820.jpg"
import "./styles.css"

export default function Ball () {
  const qtyInput = useRef()
  const params = useParams()
  const [ball, setBall] = useState(null)

  useEffect(() => {
    const getAndSetBall = async () => {
      if (params.title.startsWith("Spa")) {
        setBall(await fetchSingleBall("spalding", params.id))
      } else if (params.title.startsWith("Wil")) {
        setBall(await fetchSingleBall("wilson", params.id))
      } else {
        setBall(await fetchSingleBall("molten", params.id))
      }
    }
    
    console.log("fetching...")
    getAndSetBall()
  }, [])

  const handleDecrementQty = () => {
    if (qtyInput.current.value <= 1) return
    qtyInput.current.value--
  }

  const handleIncrementQty = () => {
    if (qtyInput.current.value >= 10) return
    qtyInput.current.value++
  }

  return (
    <div 
      className="ball">

        <section 
          className="ball-image-container">
          <div 
            className="ball-side-nav">
              <Link 
                className="ball-back-link"
                to="/balls">
               <div 
                  className="left-arrow-container" 
                  id="ball-back-btn">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
              </Link>
          </div>
          <img
          className="ball-ball-image"
          src={ball && ball.src}
          alt="ball"
          loading="lazy"
          />
        </section>

        <section
          className="info-container">
          <div 
            className="ball-title-container">
            <h1 className="ball-title">{ball && ball.title}</h1>
            <div className="rating-container">
              <i className="fa-regular fa-heart"></i>
              <i className="fa-regular fa-heart"></i>
              <i className="fa-regular fa-heart"></i>
              <i className="fa-regular fa-heart"></i>
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>
          <div 
            className="description-container">
            <p>
              {ball && ball.description}
            </p>
          </div>
          <div
            className="price-container">
            ${ball && ball.price}
          </div>
          <div
            className="purchase-section">
            <form 
              className="purchase-form">
              <div 
                className="quantity-container">
                <label 
                  className="ball-qty-label"
                  htmlFor="quantity">
                  Quantity
                </label>
                <input 
                  ref={qtyInput}
                  className="ball-qty-input"
                  type="number" 
                  placeholder="1"
                  name="quantity"
                />
                <div 
                  className="control">
                  <div 
                    onClick={() => handleDecrementQty()}
                    className="left-arrow-container">
                    <i className="fa-solid fa-arrow-left"></i>
                  </div>
                  <div 
                    onClick={() => handleIncrementQty()}
                    className="right-arrow-container">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>
              <div 
                className="btn-container">
                <button
                  id="ball-make-basket-btn"
                  className="make-basket-btn">
                  Make the basket
                </button>
              </div>
            </form>
          </div>
          <p className="promo">BallerStore members get 20% off</p>
        </section>

    </div>
  )
}