import React, { useState, useContext } from "react";
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import Header from "./Header/Header";

export default function Admin() {
  const authCtx = useContext(AuthContext);
  const [activeNav, setActiveNav] = useState("home");

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

  // if (authCtx.isLoggedIn == false && authCtx.isAdmin == false) {
  //   return <Navigate to="/admin/login" replace={true} />;
  // }

  return (
    <div>
      <Header name={"Admin"} />
      <section class="main-content columns is-fullheight">
        <aside class="column is-2 is-narrow-mobile is-fullheight section">
          <p class="menu-label is-hidden-touch">Navigation</p>
          <ul class="menu-list">
            <li>
              <Link
                to="/admin"
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
                to="/admin/add"
                onClick={() => setActiveNav("add-apps")}
                href="#"
                class={activeNav == "add-apps" ? "is-active" : ""}
              >
                <span class="icon">
                  <FontAwesomeIcon icon={faPlus} />
                </span>{" "}
                Add Apps
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
          <Outlet />
        </div>
      </section>
    </div>
  );
}
