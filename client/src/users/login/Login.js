import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import brand from "../../assets/img/events-now-logo.png";
import { setAlert } from "../../redux/alert/alert.actions";
import { loginUser } from "../../redux/users/user.actions";
import { usersFeatureKey } from "../../redux/users/user.reducer";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state[usersFeatureKey]);

  const validateEmail = (e) => {
    setUser({
      ...user,
      email: e.target.value,
    });
    let regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regExp.test(e.target.value)) {
      setUserError({
        ...userError,
        emailError: "Enter a proper Email",
      });
    } else {
      setUserError({
        ...userError,
        emailError: "",
      });
    }
  };
  const validatePassword = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    });
    let regExp = /^[a-zA-Z0-9]\w{7,14}$/;
    if (!regExp.test(e.target.value)) {
      setUserError({
        ...userError,
        passwordError: "Enter a proper Password",
      });
    } else {
      setUserError({
        ...userError,
        passwordError: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email != "" && user.password != "") {
      dispatch(loginUser(user, history));
    } else {
      dispatch(setAlert("Please fill in the details", "danger"));
    }
  };

  let {
    loading,
    errorMessage,
    token,
    user: userDetails,
    isAuthenticated,
  } = userInfo;

  return (
    <>
      {/* <pre>{JSON.stringify(userInfo)}</pre> */}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto">
              <div className="card animated zoomIn">
                <div className="card-header bg-danger text-white h5">Login</div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        name="email"
                        type="email"
                        className={`form-control ${
                          userError.emailError.length > 0 ? "is-invalid" : ""
                        }`}
                        placeholder="Email"
                        value={user.email}
                        onChange={validateEmail}
                      />
                      {userError.emailError.length > 0 ? (
                        <small className="register-link">
                          Enter a proper Email
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        name="password"
                        type="password"
                        className={`form-control ${
                          userError.passwordError.length > 0 ? "is-invalid" : ""
                        }`}
                        placeholder="Password"
                        value={user.password}
                        onChange={validatePassword}
                      />
                      {userError.passwordError.length > 0 ? (
                        <small className="register-link">
                          Enter a proper password
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Login"
                        className="btn btn-sm btn-danger"
                      />
                    </div>
                    <small>
                      Don't have an account with us?
                      <Link
                        to="/users/register"
                        className="font-weight-bold register-link ml-1"
                      >
                        Register
                      </Link>
                    </small>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
