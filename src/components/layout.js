import React from "react";
import { Link } from "react-router-dom";
import { ToggleButton } from "./toggleButton/toggleButton";
import { ExampleComponent, AvButton } from "av_shared_library";

export const Layout = ({ children }) => {
  return (
    <div>
      <ExampleComponent text={"gggg"} />
      <AvButton label={"gggg"} primary/>
      <h1>
        <Link to="/">ReactTable</Link>
      </h1>
      <ToggleButton />
      {children}
      <hr />
    </div>
  );
};
