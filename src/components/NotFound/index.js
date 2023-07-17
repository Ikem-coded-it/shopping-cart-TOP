import errorSVG from "./404 error with a tired person-cuate.svg";
import { Link } from "react-router-dom";
import "./styles.css";

export default function NotFound () {
  return (
    <div className="error-page">
      <div className="right-side">
        <h1 className="opss">Opss...</h1>
        <h1 className="something">Something</h1>
        <h1 className="gone-wrong">gone wrong!</h1>
        <div className="cant-find">
          We can't find the page you're looking for
        </div>
        <div className="back-btn-container">
          <Link className="back-link" to="/">
            <button className="go-back-btn">
              <i className="fa-solid fa-arrow-left"></i>
              GO BACK
            </button>
          </Link>
        </div>
      </div>
      <img
        src={errorSVG}
        className="left-side"
        alt="404 error"
      />
    </div>
  )
}