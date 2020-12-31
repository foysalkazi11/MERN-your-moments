import React, { useContext, createContext, useReducer, useEffect } from "react";
import authReducer from "./authReducer";
import axiosConfic from "../axiosConfic";
import { CHECK_USER, ERROR_USER, CLEAR_ERROR, RESET_LOADING } from "./type";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: false
};
const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkUser();
  }, []);

  //register user
  const registerUser = async (formData) => {
    dispatch({ type: RESET_LOADING });
    const url = "/user/register";
    try {
      const res = await axiosConfic.post(url, formData);
      dispatch({ type: CHECK_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_USER, payload: error.response.data.message });
    }
  };

  //login user
  const loginUser = async (formData) => {
    dispatch({ type: RESET_LOADING });
    const url = "/user/login";
    try {
      const res = await axiosConfic.post(url, formData);
      dispatch({ type: CHECK_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_USER, payload: error.response.data });
    }
  };

  //login user
  const logoutUser = async () => {
    dispatch({ type: RESET_LOADING });
    try {
      const res = await axiosConfic("/user/logout");
      dispatch({ type: CHECK_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_USER, payload: error.response.data });
    }
  };
  //clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  //check user is authenticated
  const checkUser = async () => {
    try {
      const res = await axiosConfic("/user/authenticated");
      dispatch({ type: CHECK_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: CLEAR_ERROR });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        registerUser,
        loginUser,
        logoutUser,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthState, useAuth };
