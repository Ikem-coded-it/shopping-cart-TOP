import { 
  useRef, 
  useEffect, 
  useState,
  useContext,
} from "react";
import { fetchSingleBall, updateCart } from "../../firebase/controllers/dbController";
import { Link, useParams } from "react-router-dom";
import CartContext from "../ProductPage/CartLogic/cartContext";
import { AuthContext } from "../App";
import Cart from "../ProductPage/Cart";
import LoadingSpinner from "../Loader";
import "./styles.css"

export default function Ball () {
  const qtyInput = useRef()
  const params = useParams()
  const [ball, setBall] = useState(null)
  const cartContext = useContext(CartContext)
  const authContext = useContext(AuthContext)
  const image = useRef()
  const ballPrice = useRef()

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
    getAndSetBall()
  }, [params.id, params.title])

  useEffect(() => {
    const { uid } = authContext.loggedInUser;
    updateCart(cartContext.cartItems, uid);
  }, [cartContext.cartItems, authContext.loggedInUser]);

  const handleCartUpdate = (e) => {
    e.preventDefault()
    const action = {
      type: "added",
      title: params.title,
      imageSrc: image.current.src,
      price: ballPrice.current.innerText,
      qty: qtyInput.current.value,
      qtyInput: qtyInput.current,
    }
    if (action.qty === "") action.qty = 1
    cartContext.cartDispatch(action)
    qtyInput.current.value = '';
  }

  const handleDecrementQty = () => {
    if (qtyInput.current.value <= 1) return
    qtyInput.current.value--
  }

  const handleIncrementQty = () => {
    if (qtyInput.current.value >= 10) return
    qtyInput.current.value++
  }

  return (
    <>
      {
        !ball ?
        <LoadingSpinner/>
        :
        <div 
        className="ball">
          <Cart />

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
            ref={image}
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
              className="price-container"
              ref={ballPrice}>
              ${ball && ball.price}
            </div>
            <div
              className="purchase-section">
              <form 
                onSubmit={(e) => handleCartUpdate(e)}
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
                    className="make-basket-btn"
                    type="submit">
                    Make the basket
                  </button>
                </div>
              </form>
            </div>
            <p className="promo">BallerStore members get 20% off</p>
          </section>

      </div>
      }
    </>
  )
}