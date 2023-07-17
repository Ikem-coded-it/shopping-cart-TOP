import { useRef } from "react";
import {v4 as uuidv4} from "uuid";
import "./reviews.css";

function ReviewCard({ name, body, time, date }) {

  return (
    <div className="review-card">
      <div id="avatar-container">
        <div id="avatar">
          {
            name.split('')[0].toUpperCase()
          }
        </div>
      </div>
      <div id="review-body">
        <div id="name-time-container">
          <div id="name-time">
            <div id="name">{name}</div>
            <div id="time">{time}</div>
          </div>
          <div id="date">{date}</div>
        </div>
        <p id="review">{body}</p>
      </div>
    </div>
  )
}

export default function Reviews ({ ball, setBall, updateDatabase, user }) {
  const reviewsModal = useRef();

  const handleOpenModal = () => {
    reviewsModal.current.showModal()
  }

  const handleCloseModal = () => {
    reviewsModal.current.close()
  }

  const handleAddReview = async(e) => {
    e.preventDefault()
    const body = e.target.review_body.value;
    if (body === '') return;

    const today = new Date();
    let hours = today.getHours()
    let minutes = today.getMinutes()

    // Add 0 infront if its a one digit time (eg; 1:3am == 01:03am)
    if (hours.toString().length < 2) hours = '0'+ hours.toString();
    if (minutes.toString().length < 2) minutes = '0'+ hours.toString();

    const date = today.getFullYear()+':'+(today.getMonth()+1)+':'+today.getDate();

    let time;
    switch(parseInt(today.getHours()) >= 12) {
      case true:
        time = hours + ':' + minutes + 'pm';
        break;
      default:
        time = hours + ':' + minutes + 'am';
    }

    // create new review
    const newReview = {
      userId: user.uid,
      userName: user.displayName,
      body,
      time,
      date,
    }

    // create new updated ball
    const newBall = {
      title: ball.title,
      description: ball.description,
      price: ball.price,
      src: ball.src,
      rating: ball.rating,
      reviews: [...ball.reviews, newReview]
    }
    console.log(newBall)

    await updateDatabase(newBall)
    setBall(newBall)
    e.target.review_body.value = '';
  }

  return (
    <>
      <div
        onClick={handleOpenModal}
        id="reviews-container">
          <i className="fa-solid fa-comment"></i>
      </div>
      <dialog
        ref={reviewsModal}
        className="reviews-modal">
          <h2 className="reviews-title">Reviews</h2>
          <i 
            className="fa-solid fa-x close-reviews"
            onClick={handleCloseModal}
          ></i>
          <div className="reviews">
            {
              ball.reviews.map((review) => {
                return <ReviewCard
                  key={uuidv4()}
                  name={review.userName}
                  time={review.time}
                  body={review.body}
                  date={review.date}
                />
              })
            }
          </div>
          <div className="reviews-form-container">
            <form 
              onSubmit={e => handleAddReview(e)}
              className="review-form">
              <input
                maxLength={150}
                minLength={4}
                name="review_body"
                className="review-input" 
              />
              <button type="submit" className="review-btn">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
      </dialog>
    </>
  )
}