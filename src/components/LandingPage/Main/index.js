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
    
    addSliderImages()
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
          <h1>Featured Products</h1>
        </div>
        <div className="featured-products-slide-container">
          <div className="slider-wrapper">
            <div
            ref={slider} 
            className="slider">

            </div>
          </div>
        </div>
      </section>

      <section className="brand-story-container">
        <div className="write-up-container-2">
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
          className="dunking-guy-image"
          src={basketBallPic}
          alt="baller"
          loading="lazy"
         />
      </section>

      {/* <div className="goal-section">
          <div></div>
      </div> */}
    </main>
  )
}