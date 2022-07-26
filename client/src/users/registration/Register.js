import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { setAlert } from "../../redux/alert/alert.actions";
import { registerUser } from "../../redux/users/user.actions";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userError, setUserError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const validateUsername = (e) => {
    setUser({
      ...user,
      name: e.target.value,
    });
    let regExp = /^[a-zA-Z0-9]{4,15}$/;
    if (!regExp.test(e.target.value)) {
      setUserError({
        ...userError,
        nameError: "Enter a proper Username",
      });
    } else {
      setUserError({
        ...userError,
        nameError: "",
      });
    }
  };
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
    if(user.name != "" && user.email != "" && user.password != ""){
      console.log(user);
      dispatch(registerUser(user, history));
    }
    else{
      dispatch(setAlert("Please fill in the fields", "danger"))
    }
  };
  return (
    <>
      {/* <pre>{JSON.stringify(user)}</pre> */}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto">
              <div className="card animated zoomIn">
                <div className="card-header bg-danger text-white h5">
                  Register
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        name="name"
                        type="text"
                        className={`form-control ${
                          userError.nameError.length > 0 ? "is-invalid" : ""
                        }`}
                        placeholder="Name"
                        value={user.name}
                        onChange={validateUsername}
                      />
                      {userError.nameError.length > 0 ? (
                        <small className="register-link">
                          Enter a proper username
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
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
                        value="Register"
                        className="btn btn-sm btn-danger"
                      />
                    </div>
                    <small>
                      Already have an account?
                      <Link
                        to="/users/login"
                        className="font-weight-bold register-link ml-1"
                      >
                        Login
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

export default Register;
