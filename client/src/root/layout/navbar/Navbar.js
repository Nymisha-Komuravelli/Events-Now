import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import brand from "../../../assets/img/events-now-logo.png";
import * as userActions from "../../../redux/users/user.actions";
import * as userReducer from "../../../redux/users/user.reducer";
import * as userUtil from "../../util/user/userUtil";

const Navbar = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const handleLogout = () => {
    dispatch(userActions.logoutUser(history));
  };
  const userInfo = useSelector((state) => state[userReducer.usersFeatureKey]);
  let { user } = userInfo;

  return (
    <nav className="navbar navbar-light bg-white navbar-expand-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={brand} alt="" />
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/events/free" className="nav-link">
                Free Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events/pro" className="nav-link">
                Pro Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events/upload" className="nav-link">
                Upload Event
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {userUtil.isLoggedIn() ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <img src={user?.avatar} alt="" width="25" height="25" className="rounded-circle"/> {user?.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={handleLogout}>
                    <i className="fa fa-sign-out-alt"></i> Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/users/login" className="nav-link">
                    <i className="fa fa-sign-in-alt"></i> Login
                  </Link>
                </li>
                <li className="nav-item ml-3">
                  <Link to="/users/register" className="nav-link">
                    <i className="fa fa-user-cog"></i>Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
