import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="section">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h2 className="title">{authCtx.name}</h2>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
