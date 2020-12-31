import React, { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import ReviewDisplay from "./ReviewDisplay";
import { notification } from "../utility/notification";
import { useReview } from "../context/reviewContext/ReviewState";
import { useAuth } from "../context/authContext/AuthState";

const Reviw = ({ id, props }) => {
  const { user } = useAuth();
  const { createReview, errorReview, clearError } = useReview();
  const [review, setreview] = useState("");
  const [rating, setrating] = useState("");
  const [hover, sethover] = useState("");

  useEffect(() => {
    if (errorReview) {
      notification("error", errorReview);
      clearError();
    }
    //eslint-disable-next-line
  }, [errorReview]);

  const handleChage = (e) => {
    const { value } = e.target;
    setreview(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      rating: rating,
      review: review
    };

    if (!rating < 1 && review) {
      if (user) {
        createReview(id, data);
        setrating("");
        setreview("");
        notification("info", "successfully added review");
      } else {
        notification("error", "you must register first to write a review");

        props.history.push("/signup", props.location.pathname);
      }
    } else {
      notification("error", "please enter both rating and review");
    }
  };

  return (
    <div className="rating-review-container">
      <div className="reviw">
        <h4>Leave A Reviw</h4>

        <form action="#" onSubmit={handleSubmit}>
          <div className="input-container">
            <h5 htmlFor="rating">Rating</h5>
            <div className="icon-container">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                  <BsStarFill
                    key={index}
                    fontSize="1.5rem"
                    name="rating"
                    className="star"
                    value={ratingValue}
                    onClick={() => setrating(ratingValue)}
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => sethover(ratingValue)}
                    onMouseLeave={() => sethover("")}
                  />
                );
              })}
            </div>
          </div>
          <div className="input-container">
            <h5 htmlFor="reviw">Review</h5>
            <textarea
              name="review"
              id="review"
              cols="30"
              rows="5"
              value={review}
              onChange={handleChage}
              placeholder="leave a review"
            ></textarea>
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
      <ReviewDisplay id={id} />
    </div>
  );
};

export default Reviw;
