import React from "react";
import WhackAMole from "../whackAMole/whackAMole";
import { Button } from "../button/button";
import "./userCard.css";

export const UserCard = props => {
  const { data: { avatar_url, html_url, login }, logout } = props;

  return (
    <div className="userCard">
      <p data-testid="userData">The mole:<a className="userCard__details" href={html_url}><img className="userCard__avatar" src={avatar_url} />{login}</a><Button onClick={logout}>↩</Button></p>
      <WhackAMole avatarUrl={avatar_url} />
    </div>
  );
}