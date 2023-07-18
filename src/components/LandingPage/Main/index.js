 import { Link } from "react-router-dom";
 import { useContext, useEffect, useRef } from "react";
 import { AuthContext } from "../../App";
 import basketBallPic from "../images/gettyimages-490313359-612x612.jpg"
 import sliderImages from "../images";
import "./styles.css"

export default function Main() {
  const authContext = useContext(AuthContext)
  const slider = useRef()

  useEffect(() => {
    const addSliderImages = () => {
      const sliderImagesArr = Object.values(sliderImages)
      for(let i = 0; i < sliderImagesArr.length; i++) {
        const sliderImageContainer = document.createElement('div')
        sliderImageContainer.classList.add('slider-image-container')

        const image = document.createElement('img')
        image.setAttribute('src', `${sliderImagesArr[i]}`)
        image.setAttribute('loading', 'lazy')
        image.classList.add('slider-image')

        sliderImageContainer.appendChild(image)
        slider.current.appendChild(sliderImageContainer)
      }
    }

    const revealOnScroll = () => {
      const reveals = document.querySelectorAll('.reveal')

      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;

        if(revealTop < windowHeight - revealPoint)
          reveal.classList.add('active')
        else
          reveal.classList.remove('active')
        
      })
    }
    
    addSliderImages()
    window.addEventListener('scroll', () => revealOnScroll())

    return window.removeEventListener('scroll', revealOnScroll)
  }, [])

  return(
    <main className="main">
      <section data-testid="landing" className="top-section">
        <div className="write-up-container">
          <div className="write-up">
            <div className="welcome">Welcome</div>
            <div className="to">to</div>
            <div className="baller-store">BallerStore</div>
            <div className="para">Ready to take your game to the next level?</div>
          </div>
          {
            authContext.loggedInUser !== null ?
            <Link 
              className="link" 
              to="/balls">
              <button>
                Explore Collection
              </button>
            </Link>
            :
            <Link 
              className="link" 
              to="/auth/login">
              <button>
                Explore Collection
              </button>
            </Link>
          }
        </div>
      </section>

      <section className="featured-products">
        <div className="featured-products-title-container">
          <h1 className="reveal">Featured Products</h1>
        </div>
        <div className="featured-products-slide-container">
          <div className="slider-wrapper reveal">
            <div
            ref={slider} 
            className="slider">

            </div>
          </div>
        </div>
      </section>

      <section className="brand-story-container">
        <div 
          className="write-up-container-2 reveal">
          <h1>#1 Basketball Store</h1>
          <p className="brand-story-1">
            Discover the difference quality makes. Explore our collection, choose the ball that resonates with your passion
          </p>
          <p className="brand-story-2">
            At BallerStore, we believe that every aspiring athlete, no matter their skill level, deserves access to high-quality basketballs that can truly enhance their performance.
          </p>
          {
            authContext.loggedInUser !== null ?
            <Link 
              className="link third-section-link" 
              to="/balls">
              <button className="white-btn">
                Explore Collection
              </button>
            </Link>
            :
            <Link 
              className="link third-section-link" 
              to="/auth/login">
              <button className="white-btn">
                Explore Collection
              </button>
            </Link>
          }
        </div>
        <img
          className="dunking-guy-image reveal"
          src={basketBallPic}
          alt="baller"
          loading="lazy"
         />
      </section>

      <div className="values-section">
          <div className="value-1 reveal">
            <i className="fa-solid fa-trophy value-icon"></i>
            <div className="value-title">Our Goal</div>
            <p className="value-words">
              The go-to store for basketball enthusiasts, providing top-quality products and exceptional service.
            </p>
          </div>
          <div className="value-2 reveal">
            <i className="fa-solid fa-users value-icon"></i>
            <div className="value-title">Community</div>
            <p className="value-words">
              Our community is an inclusive hub where players of all ages and skill levels come together to share their love for the game.
            </p>
          </div>
          <div className="value-3 reveal">
            <i className="fa-solid fa-truck-fast value-icon"></i>
            <div className="value-title">Speed Delivery</div>
            <p className="value-words">
              Experience the thrill of quick product delivery as we prioritize speed and efficiency to ensure your basketball gear arrives promptly.
            </p>
          </div>
          <div className="value-4 reveal">
            <i className="fa-solid fa-person-running value-icon"></i>
            <div className="value-title">Health</div>
            <p className="value-words">
              Our store's mission is to prioritize a healthy lifestyle, empowering individuals to embrace the physical and mental benefits of basketball
            </p>
          </div>
      </div>
    </main>
  )
}