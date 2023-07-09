import { 
  useContext, 
  useRef, 
  useEffect,
} from "react"
import { Link } from "react-router-dom";
import CartContext from "../CartLogic/cartContext"
import { AuthContext } from "../../App";
import { updateCart } from "../../../firebase/controllers/dbController";
import LoadingSpinner from "../../Loader";
import "./styles.css"

export default function BallCard({ src, title, price, ballId }) {
  const cartContext = useContext(CartContext)
  const authContext = useContext(AuthContext)
  const quantityInput = useRef()
  const image = useRef()
  const ballPrice = useRef()

   useEffect(() => {
      const { uid } = authContext.loggedInUser;
      updateCart(cartContext.cartItems, uid);
    }, [cartContext.cartItems, authContext.loggedInUser]);

  const handleCartUpdate = async() => {
    const action = {
      type: "added",
      title: title,
      imageSrc: image.current.src,
      price: ballPrice.current.innerText,
      qty: quantityInput.current.value,
      qtyInput: quantityInput.current,
    }
    if (action.qty === "") action.qty = 1
    cartContext.cartDispatch(action)
  }

  const ballPageLink = `/balls/${title}/${ballId}`;

  return (
    <>
      {
        !src ? 
        <LoadingSpinner /> :
        <div 
        data-testid="ball-card"
        className="ball-card">
        <img 
          ref={image}
          className="ball-image" 
          src={src} 
          alt="ball"
          loading="lazy"
        /> 
        <Link 
          id="ballcard-link"
          to={ballPageLink}>
          <span>
            {title}
          </span>
        </Link>
        <div 
          className="input-price-container">
          <span 
            className="price"
            ref={ballPrice}>
            ${price}
          </span>
          <input 
            data-testid="qty-input"
            name="quantity"
            ref={quantityInput} 
            type="number" 
            min={1}
            max={10}
            placeholder={1}
          />
        </div>
        <button
          className="make-basket-btn"
          onClick={() => handleCartUpdate()}>
          Make the basket
        </button>
      </div>
      }
    </>
  )
}