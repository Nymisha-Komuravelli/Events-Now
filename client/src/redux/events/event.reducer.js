import * as eventActions from "./event.actions";

export const eventsFeatureKey = "events";

let initialState = {
  loading: false,
  events: [],
  errorMessage: "",
};

export const eventReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case eventActions.UPLOAD_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case eventActions.UPLOAD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case eventActions.UPLOAD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.message
      };
    case eventActions.GET_FREE_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case eventActions.GET_FREE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: payload,
      };
    case eventActions.GET_FREE_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.message,
      };
    case eventActions.GET_PRO_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case eventActions.GET_PRO_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: payload,
      };
    case eventActions.GET_PRO_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.message,
      };
    default:
      return state;
  }
};
