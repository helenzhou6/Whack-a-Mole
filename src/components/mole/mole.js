import React from "react";
import "./mole.css";
import { getRandomNo } from "../../utilities/getRandomNo";

export default class Mole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      moleStatus: "waiting"
    };
  }

  startGame = () => {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      moleStatus: "waiting"
    });

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
          this.props.decFunction();
          this.startGame();
        }
      });
    });
  };

  componentDidMount() {
    this.startGame();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onClick = e => {
    this.props.incFunction(e);
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
    const { moleStatus } = this.state;
    const { avatarUrl } = this.props;

    if (moleStatus === "HIT ME!") {
      return (
        <React.Fragment>
          <div className="block">
            <img onClick={this.onClick} className="avatar" src={avatarUrl} />
          </div>
        </React.Fragment>
      );
    } else if (moleStatus === "hit") {
      return (
        <React.Fragment>
          <div className="block hit"></div>
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
