import React from "react";
import Mole from "../mole/mole";
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

  incScore = (e) => {
    e.preventDefault();
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
          <h3>Whack a mole</h3>
          <div className="moleDesc">
            <p>Your face is the mole!</p>
            <p>Try and whack it as many times as you can!</p>
            <p>You get +1 point for hitting and -1 point for missing</p>
          </div>
          <button onClick={this.startGame}>Start</button>
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
          <h3>Whack a mole</h3>
          <div className="moleDesc">
            <p>Your face is the mole!</p>
            <p>Try and whack it as many times as you can!</p>
            <p>You get +1 point for hitting and -1 point for missing</p>
          </div>
          <div className="moles">{moleArray}</div>
          <h4>Your score: {this.state.score}</h4>
        </React.Fragment>
      );
    } else if (this.state.phase === "result") {
      return (
        <React.Fragment>
          <h3>Whack a mole</h3>
          <div className="moleDesc">
            <p>Your face is the mole!</p>
            <p>Try and whack it as many times as you can!</p>
            <p>You get +1 point for hitting and -1 point for missing</p>
          </div>
          <h4>Your score: {this.state.score}</h4>
          <button onClick={this.restart}>Play Again?</button>
        </React.Fragment>
      );
    }
  }
}
