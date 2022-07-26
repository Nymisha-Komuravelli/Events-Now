import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import * as userUtil from "../user/userUtil";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => (
      userUtil.isLoggedIn() ? <Component {...props}/> : <Redirect to="/users/login"/>
  )}/>;
};

export default PrivateRoute;
