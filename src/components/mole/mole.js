import React from "react";
import "./mole.css";
import { getRandomNo } from "../../utilities/getRandomNo";

export default class Mole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      moleStatus: "waiting",
      gameIsRunning: false
    };
  }

  reset = (gameIsRunning) => {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      moleStatus: "waiting",
      gameIsRunning
    });
  }

  startGame = () => {
    this.reset(true);

    const targetTime = getRandomNo(1000, 10000);
    const timeLimit = getRandomNo(500, 1000);

    const { time } = this.state;
    this.setState(() => {
      const startTime = Date.now() - time;
      this.timer = setInterval(() => {
        const { time } = this.state;
        this.setState({ time: Date.now() - startTime });
        if (time < targetTime && targetTime < time + timeLimit) {
          this.setState({ moleStatus: "HIT ME!" });
        } else if (time > targetTime + timeLimit) {
          this.startGame();
        }
      }, 500);
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.gameState === 'running' && !prevState.gameIsRunning) {
      this.startGame();
    } else if (this.props.gameState === 'result' && prevState.gameIsRunning) {
      clearInterval(this.timer);
      this.setState({
        time: 0,
        gameIsRunning: false
      });
    }
  }

  componentWillUnmount() {
    this.reset(false);
  }

  onClick = () => {
    this.props.incFunction();
    clearInterval(this.timer);
    this.setState({
      time: 0,
      moleStatus: "hit"
    });

    this.timer = setInterval(() => {
      this.startGame();
    }, 400);
  };

  render() {

    const { moleStatus, gameIsRunning } = this.state;
    const { avatarUrl } = this.props;

    if (moleStatus === "HIT ME!" && gameIsRunning) {
      return (
        <React.Fragment>
          <div className="block">
            <img onClick={this.onClick} className="avatar" src={avatarUrl} />
          </div>
        </React.Fragment>
      );
    } else if (moleStatus === "hit" && gameIsRunning) {
      return (
        <React.Fragment>
          <div className="block hit"></div>
        </React.Fragment>
      );
    } else if (moleStatus === "HIT ME!" && !gameIsRunning) {
      return (
        <React.Fragment>
          <div className="block">
            <img className="avatar" src={avatarUrl} />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="block"></div>
        </React.Fragment>
      );
    }
  }
}
