import React, { useContext, createContext, useReducer, useEffect } from "react";
import campReducer from "./campReducer";
import {
  ALL_CAMP,
  CREATE_CAMP,
  ERROR_CAMP,
  CLEAR_ERROR,
  SINGLE_CAMP,
  UPDATE_CAMP,
  DELETE_CAMP,
  RESET_LOADING
} from "./type";
import axiosConfic from "../axiosConfic";

const initialState = {
  campGround: [],
  singleGround: {},
  newSingleGround: false,
  updated: false,
  deleteGround: false,
  createCamp: false,
  message: "",
  isLoading: true,
  error: false
};

const CampContext = createContext();

const CampState = ({ children }) => {
  const [state, dispatch] = useReducer(campReducer, initialState);
  useEffect(() => {
    dispatch({ type: RESET_LOADING });
  }, []);

  //get all campground
  const allCamp = async () => {
    dispatch({ type: RESET_LOADING });
    const url = "/campground";
    try {
      const res = await axiosConfic(url);
      dispatch({ type: ALL_CAMP, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_CAMP, payload: error.response.data });
    }
  };

  //cerate camp
  const createCampGround = async (formData) => {
    dispatch({ type: RESET_LOADING });
    const url = "/campground";
    try {
      const res = await axiosConfic.post(url, formData);
      dispatch({ type: CREATE_CAMP, payload: res.data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: ERROR_CAMP, payload: error.response.statusText });
    }
  };

  //clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  //get single camp
  const singelCamp = async (id) => {
    dispatch({ type: RESET_LOADING });
    const url = `/campground/${id}`;
    try {
      const res = await axiosConfic(url);

      dispatch({ type: SINGLE_CAMP, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_CAMP, payload: error.response.data });
    }
  };

  //update single camp
  const updateCamp = async (id, value) => {
    dispatch({ type: RESET_LOADING });
    const url = `/campground/${id}`;
    try {
      const res = await axiosConfic.patch(url, value);
      dispatch({ type: UPDATE_CAMP, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_CAMP, payload: error.response.data });
    }
  };

  //delete camp
  const deleteCamp = async (id) => {
    dispatch({ type: RESET_LOADING });
    const url = `/campground/${id}`;
    try {
      const res = await axiosConfic.delete(url);
      dispatch({ type: DELETE_CAMP, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_CAMP, payload: error.response.data });
    }
  };

  // reset Loading
  const resetLoading = () => {
    dispatch({ type: RESET_LOADING });
  };

  return (
    <CampContext.Provider
      value={{
        ...state,
        createCampGround,
        clearError,
        allCamp,
        singelCamp,
        deleteCamp,
        updateCamp,
        resetLoading
      }}
    >
      {children}
    </CampContext.Provider>
  );
};

const useCamp = () => {
  return useContext(CampContext);
};

export { CampState, useCamp };
