import React from "react";

export default function Header({ name }) {
  return (
    <nav class="navbar has-shadow is-flex is-justify-content-center">
      <p class="title">Hello {name}</p>
    </nav>
  );
}
