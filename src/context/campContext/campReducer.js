import {
  ALL_CAMP,
  CREATE_CAMP,
  CLEAR_ERROR,
  ERROR_CAMP,
  SINGLE_CAMP,
  UPDATE_CAMP,
  DELETE_CAMP,
  RESET_LOADING
} from "./type";
const campReducer = (state, action) => {
  if (action.type === ALL_CAMP) {
    return {
      ...state,
      campGround: action.payload,
      createCamp: false,
      deleteGround: false,
      newSingleGround: false,
      singleGround: {},
      message: "",
      isLoading: false,
      error: false
    };
  }
  if (action.type === SINGLE_CAMP) {
    return {
      ...state,
      singleGround: action.payload,
      updated: false,
      newSingleGround: true,
      isLoading: false,
      error: false
    };
  }
  if (action.type === UPDATE_CAMP) {
    return {
      ...state,
      updated: action.payload,
      isLoading: false,
      error: false
    };
  }
  if (action.type === DELETE_CAMP) {
    return {
      ...state,
      deleteGround: action.payload.deleteGround,
      isLoading: false,
      error: false
    };
  }
  if (action.type === CREATE_CAMP) {
    return {
      ...state,
      createCamp: action.payload.createCamp,
      message: action.payload.message,
      isLoading: false,
      error: false
    };
  }
  if (action.type === ERROR_CAMP) {
    return {
      ...state,
      createCamp: false,
      message: "",
      isLoading: false,
      error: action.payload
    };
  }
  if (action.type === CLEAR_ERROR) {
    return {
      ...state,
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
};

export default campReducer;
