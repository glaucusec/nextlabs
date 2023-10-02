import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Header({ name }) {
  const authCtx = useContext(AuthContext);
  return (
    <nav className="navbar has-shadow is-flex is-justify-content-center">
      <p className="title">Hello {authCtx.name}</p>
    </nav>
  );
}
