import { ALL_REVIEW, ERROR_REVIEW, CLEAR_ERROR, RESET_LOADING } from "./type";
const reviewReducer = (state, action) => {
  if (action.type === ALL_REVIEW) {
    return {
      ...state,
      reviews: action.payload,
      loadReview: false,
      errorReview: false
    };
  }
  if (action.type === ERROR_REVIEW) {
    return {
      ...state,
      reviews: [],
      loadReview: false,
      errorReview: action.payload
    };
  }
  if (action.type === RESET_LOADING) {
    return {
      ...state,
      loadReview: true,
      errorReview: false
    };
  }
  if (action.type === CLEAR_ERROR) {
    return {
      ...state,
      errorReview: false
    };
  }
  return state;
};

export default reviewReducer;
