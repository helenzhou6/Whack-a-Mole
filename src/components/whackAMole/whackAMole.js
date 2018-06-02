import React from "react";
import Mole from "../mole/mole";
import { Button } from "../button/button";
import "./whackAMole.css";

export default class WhackAMole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      phase: "start",
      time: 0,
      totalMoles: 0
    };
  }

  startGame = () => {
    this.setState({ phase: "running" });
    this.timer = setTimeout(() => {
      this.setState({ phase: "result" });
    }, 10000);
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  incScore = () => {
    this.setState(prevState => {
      return { score: prevState.score + 1 };
    });
  }

  restart = () => {
    clearInterval(this.timer);
    this.setState(() => {
      return {
        score: 0,
        phase: "start",
        time: 0,
        totalMoles: 0
      };
    });
    this.startGame();
  };

  render() {

    const { phase } = this.state;

    let buttonSection;
    if (phase === "start") {
      buttonSection = <Button onClick={this.startGame}>Start</Button>;
    } else if (phase === "result") {
      buttonSection = <Button onClick={this.restart}>Play Again?</Button>;
    }

    const moleArray = Array.from({ length: 9 }, (_, i) => (
      <Mole
        avatarUrl={this.props.avatarUrl}
        incFunction={this.incScore}
        key={`mole${i}`}
        gameState={phase}
      />
    ));

    return (
      <React.Fragment>
        <div className="moleDesc">
          <p>Hit as many moles as you can in 10 seconds!</p>
        </div>
        <p>{buttonSection}</p>
        <div className="moles">{moleArray}</div>
        <h4 className="score-text">Your score: {this.state.score}</h4>
      </React.Fragment>
    );
  }
}
