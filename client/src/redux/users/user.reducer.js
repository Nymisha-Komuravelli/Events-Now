import {
  GET_USER_INFO_FAILURE,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "./user.actions";

export const usersFeatureKey = "users";

let initialState = {
  loading: false,
  errorMessage: "",
  token: "",
  user: {},
  isAuthenticated: false,
};

export const userReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("events-token", payload.token);
      return {
        ...state,
        loading: false,
        token: payload.token,
        isAuthenticated: true,
        user: payload.user,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.message,
        user: {},
        isAuthenticated: false,
      };
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user
      };
      
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        user: {},
        errorMessage: payload.message,
      };
    case LOGOUT_USER:
      localStorage.removeItem("events-token");
      return {
        loading: false,
        user: {},
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
