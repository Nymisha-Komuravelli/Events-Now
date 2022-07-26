import Axios from "axios";
import * as tokenUtil from "../../root/util/user/tokenUtil";
import * as userUtil from "../../root/util/user/userUtil";
import { setAlert } from "../alert/alert.actions";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

export const LOGOUT_USER = "LOGOUT_USER";

export const registerUserRequest = () => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};
export const registerUserSuccess = (message) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: message,
  };
};
export const registerUserFailure = (error) => {
  return {
    type: REGISTER_USER_FAILURE,
    payload: error,
  };
};
export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};
export const loginUserSuccess = (data) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};
export const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};
export const getUserInfoRequest = () => {
  return {
    type: GET_USER_INFO_REQUEST,
  };
};
export const getUserInfoSuccess = (data) => {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload: data,
  };
};
export const getUserInfoFailure = (error) => {
  return {
    type: GET_USER_INFO_FAILURE,
    payload: error,
  };
};

export const registerUser = (user, history) => {
  return async (dispatch) => {
    dispatch(registerUserRequest());
    try {
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/users/register`;
      let response = await Axios.post(dataURL, user);
      dispatch(registerUserSuccess(response.data));
      dispatch(setAlert(response.data.message, "success"));
      history.push("/users/login");
    } catch (error) {
      dispatch(registerUserFailure(error.response.data));
      let errorList = error.response.data.errors;
      for (let error of errorList) {
        dispatch(setAlert(error.message, "danger"));
      }
    }
  };
};
export const loginUser = (user, history) => {
  return async (dispatch) => {
    dispatch(loginUserRequest());
    try {
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/users/login`;
      let response = await Axios.post(dataURL, user);
      dispatch(loginUserSuccess(response.data));
      dispatch(setAlert(response.data.message, "success"));
      history.push("/");
    } catch (error) {
      dispatch(loginUserFailure(error.response.data));
      let errorList = error.response.data.errors;
      for (let error of errorList) {
        dispatch(setAlert(error.message, "danger"));
      }
    }
  };
};

export const getUserInfo = (token) => {
  return async (dispatch) => {
    if(userUtil.getToken()){
      tokenUtil.setAuthToken(userUtil.getToken());
    }
    try {
      dispatch(getUserInfoRequest());
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/users`;
      let response = await Axios.get(dataURL, token);
      dispatch(getUserInfoSuccess(response.data));
    } catch (error) {
      dispatch(loginUserFailure(error.response.data));
      let errorList = error.response.data.errors;
      for (let error of errorList) {
        dispatch(setAlert(error.message, "danger"));
      }
    }
  };
};

export const logoutUser = (history) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    history.push("/");
  };
};
