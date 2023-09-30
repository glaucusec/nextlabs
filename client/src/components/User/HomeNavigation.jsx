import React, { useState, useContext, useEffect } from "react";
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faTasks,
  faCheck,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../context/AuthContext";
import Header from "../Admin/Header/Header";

export default function HomeNavigation() {
  const [activeNav, setActiveNav] = useState("home");
  const authCtx = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchDetails() {
      const response = await axios.post(
        "http://localhost:3000/api/admin/fetchTasks",
        {},
        { withCredentials: true }
      );
      console.log(response)
      if (response.status == 200) {
        setTasks(response.data);
      }
    }
    fetchDetails();
  }, []);

  async function logoutHandler() {
    setActiveNav("logout");
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        authCtx.setIsLoggedOutHandler();
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  if (authCtx.isLoggedIn && authCtx.isAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <div>
      <Header name={"Admin"} />
      <section class="main-content columns is-fullheight">
        <aside class="column is-2 is-narrow-mobile is-fullheight section">
          <p class="menu-label is-hidden-touch">Navigation</p>
          <ul class="menu-list">
            <li>
              <Link
                to="/home"
                onClick={() => setActiveNav("home")}
                href="#"
                class={activeNav == "home" ? "is-active" : ""}
              >
                <span class="icon">
                  <FontAwesomeIcon icon={faHome} />
                </span>{" "}
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/home/profile"
                onClick={() => setActiveNav("profile")}
                href="#"
                class={activeNav == "profile" ? "is-active" : ""}
              >
                <span class="icon">
                  <FontAwesomeIcon icon={faUser} />
                </span>{" "}
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/home/points"
                onClick={() => setActiveNav("points")}
                href="#"
                class={activeNav == "points" ? "is-active" : ""}
              >
                <span class="icon">
                  <FontAwesomeIcon icon={faCheck} />
                </span>{" "}
                Points
              </Link>
            </li>
            <li>
              <Link
                to="/home/tasks"
                onClick={() => setActiveNav("tasks")}
                href="#"
                class={activeNav == "tasks" ? "is-active" : ""}
              >
                <span class="icon">
                  <FontAwesomeIcon icon={faTasks} />
                </span>{" "}
                Tasks
              </Link>
            </li>
            <li>
              <Link
                onClick={() => logoutHandler()}
                href="#"
                class={activeNav == "logout" ? "is-active" : ""}
              >
                <span class="icon">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </span>{" "}
                Logout
              </Link>
            </li>
          </ul>
        </aside>

        <div class="container column is-10">
          <Outlet context={{ tasks: tasks }} />
        </div>
      </section>
    </div>
  );
}
