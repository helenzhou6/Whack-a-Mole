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
      time: 0
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

  decScore = () => {
    return this.setState(prevState => {
      return { score: prevState.score - 1 };
    });
  }

  restart = () => {
    clearInterval(this.timer);
    this.setState(() => {
      return {
        score: 0,
        phase: "start",
        time: 0
      };
    });
    this.startGame();
  };

  render() {
    if (this.state.phase === "start") {
      return (
        <React.Fragment>
          <div className="moleDesc">
            <p>Hit as many moles as you can in 10 seconds!</p>
            <p>+1 for hitting and -1 for missing</p>
          </div>
          <Button onClick={this.startGame}>Start</Button>
        </React.Fragment>
      );
    } else if (this.state.phase === "running") {
      const moleArray = Array.from({ length: 9 }, (_, i) => (
        <Mole
          avatarUrl={this.props.avatarUrl}
          incFunction={this.incScore}
          decFunction={this.decScore}
          key={`mole${i}`}
        />
      ));

      return (
        <React.Fragment>
          <div className="moleDesc">
            <p>+1 for hitting and -1 for missing</p>
          </div>
          <div className="moles">{moleArray}</div>
          <h4>Your score: {this.state.score}</h4>
        </React.Fragment>
      );
    } else if (this.state.phase === "result") {
      return (
        <React.Fragment>
          <div className="moleDesc">
            <p>+1 for hitting and -1 for missing</p>
          </div>
          <h4>Your score: {this.state.score}</h4>
          <Button onClick={this.restart}>Play Again?</Button>
        </React.Fragment>
      );
    }
  }
}
