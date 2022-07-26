import { combineReducers } from "redux";
import * as alertReducer from "./alert/alert.reducer";
import * as userReducer from "./users/user.reducer";
import * as eventReducer from "./events/event.reducer";

export const rootReducer = combineReducers({
  [alertReducer.alertFeatureKey]: alertReducer.alertReducer,
  [userReducer.usersFeatureKey]: userReducer.userReducer,
  [eventReducer.eventsFeatureKey]: eventReducer.eventReducer,
});
