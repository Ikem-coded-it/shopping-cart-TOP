import "./styles.css";
import { Link } from "react-router-dom"

export default function Contacts () {
  return (
    <div className="contacts">
      <div className="socials">
        <Link to="https://github.com/ikem-coded-it">
          <i className="fa-brands fa-github contact-icon"></i>
        </Link>
        <Link to="https://twitter.com/IkemO06934594">
          <i className="fa-brands fa-twitter contact-icon"></i>
        </Link>
        <Link to="https://wa.me/+2348126334933">
          <i className="fa-brands fa-whatsapp contact-icon"></i>
        </Link>
      </div>
    </div>
  )
}