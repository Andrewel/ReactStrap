import React from "react";
import { Link } from "react-router-dom";
import { ToggleButton } from "./toggleButton/toggleButton";
import { TestComponent } from "av-react-component-library";

export const Layout = ({ children }) => {
  return (
    <div>
      <TestComponent heading="secondary" />
      <h1>
        <Link to="/">ReactTable</Link>
      </h1>
      <ToggleButton />
      {children}
      <hr />
    </div>
  );
};
