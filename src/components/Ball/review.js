import { useRef } from "react";
import "./reviews.css";

function ReviewCard({ name, content, time }) {
  return (
    <div className="review-card">
      <div id="avatar-container">
        <div id="avatar"></div>
      </div>
      <div id="review-body">
        <div id="name-time-container">
          <div id="name">Random guy</div>
          <div id="time">10:58am</div>
        </div>
        <p id="review">Really good ball bruh, so damn good, i been hooping like crazy with this. Dunking from the 3 point line</p>
      </div>
    </div>
  )
}

export default function Reviews ({ reviews }) {
  const reviewsModal = useRef()

  const handleOpenModal = () => {
    reviewsModal.current.showModal()
  }

  const handleCloseModal = () => {
    reviewsModal.current.close()
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
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            {/* {
              reviews.map((review) => {
                return <ReviewCard
                  name={review.name}
                  time={review.time}
                  content={review.content}
                />
              })
            } */}
          </div>
          <div className="reviews-form-container">
            <form className="review-form">
              <textarea className="review-input"></textarea>
              <button type="submit" className="review-btn">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
      </dialog>
    </>
  )
}