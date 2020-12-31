import React, { createContext, useContext, useReducer } from "react";
import axiosConfic from "../axiosConfic";
import reviewReducer from "./reviewReducer";
import { ALL_REVIEW, ERROR_REVIEW, RESET_LOADING, CLEAR_ERROR } from "./type";

const ReviewContext = createContext();

const initialState = {
  reviews: [],
  loadReview: true,
  errorReview: false
};

const ReviewState = ({ children }) => {
  const [state, dispatch] = useReducer(reviewReducer, initialState);
  // get all review
  const allReview = async (id) => {
    dispatch({ type: RESET_LOADING });
    const url = `/campground/${id}/review`;
    try {
      const res = await axiosConfic(url);
      dispatch({ type: ALL_REVIEW, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_REVIEW, payload: error.response.data });
    }
  };
  //create review
  const createReview = async (id, input) => {
    dispatch({ type: RESET_LOADING });
    const url = `/campground/${id}/review`;
    try {
      const res = await axiosConfic.post(url, { data: input });
      dispatch({ type: ALL_REVIEW, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_REVIEW, payload: error.response.data });
    }
  };

  //delete review
  const deleteReview = async (id, reviewId) => {
    dispatch({ type: RESET_LOADING });
    const url = `/campground/${id}/review/${reviewId}`;
    try {
      const res = await axiosConfic.delete(url);
      dispatch({ type: ALL_REVIEW, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_REVIEW, payload: error.response.data });
    }
  };

  //clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <ReviewContext.Provider
      value={{ ...state, createReview, allReview, deleteReview, clearError }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

const useReview = () => {
  return useContext(ReviewContext);
};

export { ReviewState, useReview };
