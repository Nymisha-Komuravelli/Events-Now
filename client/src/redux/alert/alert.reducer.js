import { REMOVE_ALERT, SET_ALERT } from "./alert.actions";

export const alertFeatureKey = "alert";

let initialState = [];

export const alertReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id != payload.id);
    default: return state;
  }
};
