import "./styles.css";
import { Link } from "react-router-dom"

export default function Contacts () {
  return (
    <div className="contacts">
      <div className="words">
        <h1>Feel free</h1>
        <h1>To reach out</h1>
        <h1>To us</h1>
      </div>
      <div className="socials">
        <Link
          target="_blank" // open in new tab
          to="https://github.com/ikem-coded-it">
          <i className="fa-brands fa-github contact-icon"></i>
        </Link>
        <Link 
          target="_blank"
          to="https://twitter.com/IkemO06934594">
          <i className="fa-brands fa-twitter contact-icon"></i>
        </Link>
        <Link 
          target="_blank"
          to="https://wa.me/+2348126334933">
          <i className="fa-brands fa-whatsapp contact-icon"></i>
        </Link>
      </div>
    </div>
  )
}