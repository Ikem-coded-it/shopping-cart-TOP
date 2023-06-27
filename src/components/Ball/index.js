import { useRef } from "react";
import { Link } from "react-router-dom";
import { LoremIpsum } from 'react-lorem-ipsum';
import image from "../ProductPage/images/spalding/96500475e5b6afc0ffb0628da646a820.jpg"
import "./styles.css"

export default function Ball ({ src, title, description, price }) {
  const qtyInput = useRef()

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
          src={image}
          alt="ball"
          loading="lazy"
          />
        </section>

        <section
          className="info-container">
          <div 
            className="ball-title-container">
            <h1 className="ball-title">Spalding</h1>
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
              This is a really nice ball and it is really bouncy. You're guaranteed 
              to make a 100% of your 3 pointers. Trust me.
            </p>
          </div>
          <div
            className="price-container">
            $100
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