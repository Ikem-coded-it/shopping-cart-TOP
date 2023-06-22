import "./styles.css";

export default function Footer () {
  return (
    <div 
      data-testid="footer"
      className="footer">
      Ikem-Coded-It {new Date().getFullYear()}
      <a href="https://github.com/ikem-coded-it">
        <i className="fa-brands fa-github"></i>
      </a>
    </div>
  )
}