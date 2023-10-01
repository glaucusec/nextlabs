import React, { useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Login({ headName }) {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const username = useRef();
  const password = useRef();

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredUsername = username.current.value;
    const enteredPassword = username.current.value;
    let response;
    try {
      response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username: enteredUsername,
          password: enteredPassword,
        },
        { withCredentials: true }
      );
      const data = response.data;
      if (response.status == 200) {
        alert("Login Successful");
        authCtx.setIsLoggedInHandler(data.user.name, true, data.user.isAdmin);
        if (data.user.isAdmin) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  if (authCtx.isLoggedIn && !authCtx.isAdmin) {
    <Navigate to="/home" />;
  }
  if (authCtx.isLoggedIn && authCtx.isAdmin) {
    <Navigate to="/admin" />;
  }

  return (
    <div className="columns is-centered">
      <div className="column is-desktop is-half mt-6 box">
        <h1 className="title is-3 has-text-centered">{headName}</h1>
        <form onSubmit={loginFormSubmitHandler} className="form">
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Username"
                ref={username}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                ref={password}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">Login</button>
            </p>
            <Link to="/register">Not a Member? Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
