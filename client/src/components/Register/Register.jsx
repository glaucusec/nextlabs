import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Register({ headName }) {
  const navigate = useNavigate();
  const name = useRef();
  const username = useRef();
  const password = useRef();

  const registerFormSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredName = name.current.value;
    const enteredUsername = username.current.value;
    const enteredPassword = password.current.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: enteredName,
          username: enteredUsername,
          password: enteredPassword,
        },
        { withCredentials: true }
      );

      if (response.status == 200) {
        alert("Registration Successful");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      alert(response.data.message);
    }
  };
  return (
    <div className="columns is-centered">
      <div className="column is-desktop is-half mt-6 box">
        <h1 className="title is-3 has-text-centered">{headName}</h1>
        <form onSubmit={registerFormSubmitHandler} className="form">
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Name"
                ref={name}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </p>
          </div>
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
              <button className="button is-success">Register</button>
            </p>
            <Link to="/login">Aleady a Member? Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
