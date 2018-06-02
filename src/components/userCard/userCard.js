import React from "react";
import WhackAMole from "../whackAMole/whackAMole";
import "./userCard.css";

export const UserCard = props => {
  const { avatar_url, html_url, login } = props.data;

  return (
    <div className="userCard">
      <h3 data-testid="userData">Hello <a href={html_url}>{login}!</a></h3>
      <WhackAMole avatarUrl={avatar_url} />
    </div>
  );
}