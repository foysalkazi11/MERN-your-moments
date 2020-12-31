import React, { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import { useReview } from "../context/reviewContext/ReviewState";
import { useAuth } from "../context/authContext/AuthState";
import { ClipLoader } from "react-spinners";
const ReviewDisplay = ({ id }) => {
  const { user } = useAuth();
  const {
    reviews,
    loadReview,
    errorReview,
    allReview,
    deleteReview
  } = useReview();

  const [newReview, setnewReview] = useState([]);
  const commentDelete = (reviewId) => {
    deleteReview(id, reviewId);
  };
  useEffect(() => {
    allReview(id);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loadReview && !errorReview) {
      setnewReview(reviews);
    }

    //eslint-disable-next-line
  }, [reviews]);

  if (loadReview) {
    return (
      <div className="loading" style={{ height: "300px" }}>
        <ClipLoader color={"#1f6f8b"} size={50} loading={loadReview} />
      </div>
    );
  }

  return (
    <div className="reviewDisplay">
      {newReview.length ? <h4>All Reviews</h4> : <p>No Reviews</p>}

      {newReview.map((review) => {
        return (
          <div className="reviewDisplay-container" key={review._id}>
            <div>
              <h5>{review.author.username}</h5>
              <div>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <BsStarFill
                      key={index}
                      color={
                        review.rating >= ratingValue ? "#ffc107" : "#e4e5e9"
                      }
                    />
                  );
                })}
                <p>{review.review}</p>
              </div>
            </div>
            <div>
              {user && review.author.username === user && (
                <button onClick={() => commentDelete(review._id)}>
                  remove
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewDisplay;
