import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import FreeEvents from "./events/free/FreeEvents";
import ProEvents from "./events/pro/ProEvents";
import UploadEvent from "./events/upload/UploadEvent";
import { store } from "./redux/store";
import Home from "./root/layout/home/Home";
import Navbar from "./root/layout/navbar/Navbar";
import Alert from "./root/util/alert/Alert";
import Login from "./users/login/Login";
import Register from "./users/registration/Register";
import * as userActions from "./redux/users/user.actions";
import * as userUtil from "./root/util/user/userUtil";
import PrivateRoute from "./root/util/privateRoute/PrivateRoute";

let App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (userUtil.getToken()) {
      dispatch(userActions.getUserInfo());
    }
  });
  return (
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/events/free" component={FreeEvents} />
          <PrivateRoute exact path="/events/pro" component={ProEvents} />
          <PrivateRoute exact path="/events/upload" component={UploadEvent} />
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/users/register" component={Register} />
        </Switch>
      </Router>
  );
};

export default App;
