import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div class="columns is-centered is-vcentered m-6">
      <div class="column is-4">
        <div class="box has-text-centered">
          <p class="title">
            <Link to="/login">User Login</Link>
          </p>
        </div>
      </div>
      <div class="column is-4">
        <div class="box has-text-centered">
          <p class="title">
            <Link to="/admin">Admin Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
