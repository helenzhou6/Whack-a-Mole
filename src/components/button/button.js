import React from "react";
import "./button.css";

export const Button = ({ onClick, children }) => {
  return (
    <React.Fragment>
      <button className="button" onClick={e => onClick(e)}>{children}</button>
    </React.Fragment>
  );
}