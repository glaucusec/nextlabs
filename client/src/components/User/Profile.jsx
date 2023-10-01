import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="section">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h2 className="title">{authCtx.name}</h2>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
