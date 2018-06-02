import React from "react";
import Mole from "../mole/mole";
import "./whackAMole.css";

export default class WhackAMole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      phase: "start",
      time: 0,
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

  incTotalMoles = () => {
    this.setState(prevState => {
      return { totalMoles: prevState.totalMoles + 1 };
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

    const { phase, score } = this.state;

    let buttonSection;
    if (phase === "start") {
      buttonSection = <div className="button-overlay"><button className="button__text" onClick={this.startGame}>Start</button></div>;
    } else if (phase === "result") {
      buttonSection = <div className="button-overlay"><div className="button__text"><p className="has-nomargin">{score} moles hit</p><button onClick={this.restart}>Play Again?</button></div></div>;
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
        <div className="moles">{buttonSection}{moleArray}</div>
        {phase !== "result" ? <h4 className="score-text">{score} moles hit</h4> : ''}
      </React.Fragment>
    );
  }
}
