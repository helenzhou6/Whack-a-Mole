import React from "react";
import "./header.css";

export const Header = () => {
  return (
    <React.Fragment>
      <h1 className="to-lowercase header">Whack-a-Mole<sup className="is-small-fontSize">*</sup>!</h1>
      <p className="to-lowercase subtitle">*the mole is a GitHub avatar of your choosing</p>
    </React.Fragment>
  );
}