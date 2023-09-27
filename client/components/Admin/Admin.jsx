import React, { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header/Header";

export default function Admin() {
  const [activeNav, setActiveNav] = useState("home");

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
          </ul>
        </aside>

        <div class="container column is-10">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
