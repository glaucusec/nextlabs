import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="columns is-centered is-vcentered m-6">
      <div className="column is-4">
        <div className="box has-text-centered">
          <p className="title">
            <Link to="/login">User Login</Link>
          </p>
        </div>
      </div>
      <div className="column is-4">
        <div className="box has-text-centered">
          <p className="title">
            <Link to="/admin">Admin Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
