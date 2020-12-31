import { CHECK_USER, ERROR_USER, CLEAR_ERROR, RESET_LOADING } from "./type";

const authReducer = (state, action) => {
  if (action.type === CHECK_USER) {
    return {
      ...state,
      user: action.payload.user,
      isAuthenticated: action.payload.isAuthenticated,
      isLoading: false,
      error: false
    };
  }

  if (action.type === ERROR_USER) {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: action.payload
    };
  }
  if (action.type === CLEAR_ERROR) {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: false
    };
  }
  if (action.type === RESET_LOADING) {
    return {
      ...state,
      isLoading: true,
      error: false
    };
  }

  return state;
};

export default authReducer;
