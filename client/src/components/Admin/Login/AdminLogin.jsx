import React, { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin({ headName }) {
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
        navigate("/admin", { replace: true });
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

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
                <i className="fas fa-envelope"></i>
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
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">Login</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
