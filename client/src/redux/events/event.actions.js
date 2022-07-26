import Axios from "axios";
import * as alertActions from "../alert/alert.actions";
import * as tokenUtil from "../../root/util/user/tokenUtil";
import * as userUtil from "../../root/util/user/userUtil";

export const UPLOAD_EVENT_REQUEST = "UPLOAD_EVENT_REQUEST";
export const UPLOAD_EVENT_SUCCESS = "UPLOAD_EVENT_SUCCESS";
export const UPLOAD_EVENT_FAILURE = "UPLOAD_EVENT_FAILURE";

export const GET_FREE_EVENTS_REQUEST = "GET_FREE_EVENTS_REQUEST";
export const GET_FREE_EVENTS_SUCCESS = "GET_FREE_EVENTS_SUCCESS";
export const GET_FREE_EVENTS_FAILURE = "GET_FREE_EVENTS_FAILURE";

export const GET_PRO_EVENTS_REQUEST = "GET_PRO_EVENTS_REQUEST";
export const GET_PRO_EVENTS_SUCCESS = "GET_PRO_EVENTS_SUCCESS";
export const GET_PRO_EVENTS_FAILURE = "GET_PRO_EVENTS_FAILURE";

export const uploadEventRequest = () => {
  return {
    type: UPLOAD_EVENT_REQUEST,
  };
};
export const uploadEventSuccess = (data) => {
  return {
    type: UPLOAD_EVENT_SUCCESS,
    payload: data,
  };
};
export const uploadEventFailure = (error) => {
  return {
    type: UPLOAD_EVENT_FAILURE,
    payload: error,
  };
};
export const getFreeEventsRequest = () => {
  return {
    type: GET_FREE_EVENTS_REQUEST,
  };
};
export const getFreeEventsSuccess = (data) => {
  return {
    type: GET_FREE_EVENTS_SUCCESS,
    payload: data,
  };
};
export const getFreeEventsFailure = (error) => {
  return {
    type: GET_FREE_EVENTS_FAILURE,
    payload: error,
  };
};
export const getProEventsRequest = () => {
  return {
    type: GET_PRO_EVENTS_REQUEST,
  };
};
export const getProEventsSuccess = (data) => {
  return {
    type: GET_PRO_EVENTS_SUCCESS,
    payload: data,
  };
};
export const getProEventsFailure = (error) => {
  return {
    type: GET_PRO_EVENTS_FAILURE,
    payload: error,
  };
};
export const uploadEvent = (event, history) => {
  return async (dispatch) => {
    try {
      dispatch(uploadEventRequest());
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/events/upload`;
      let response = await Axios.post(dataURL, event);
      dispatch(uploadEventSuccess(response.data));
      if (event.type === "FREE") {
        history.push("/events/free");
      }
      if (event.type === "PRO") {
        history.push("/events/pro");
      }
      dispatch(alertActions.setAlert(response.data.message, "success"));
    } catch (error) {
      dispatch(uploadEventFailure(error.response.data));
      let errorList = error.response.data.errors;
      for (let error of errorList) {
        dispatch(alertActions.setAlert(error.message, "danger"));
      }
    }
  };
};
export const getFreeEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(getFreeEventsRequest());
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/events/free`;
      let response = await Axios.get(dataURL);
      dispatch(getFreeEventsSuccess(response.data));
    } catch (error) {
      dispatch(getFreeEventsFailure(error.response.data));
    }
  };
};
export const getProEvents = () => {
  return async (dispatch) => {
    if (userUtil.getToken()) {
      tokenUtil.setAuthToken(userUtil.getToken());
    }
    try {
      dispatch(getProEventsRequest());
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/events/pro`;
      let response = await Axios.get(dataURL);
      dispatch(getProEventsSuccess(response.data));
    } catch (error) {
      dispatch(getProEventsFailure(error.response.data));
    }
  };
};
