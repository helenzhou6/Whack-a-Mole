import React from "react";
import { UserCard } from '../userCard/userCard'
import { getUserData } from "../../utilities/getUserData";
import './form.css'
import { Button } from '../button/button'

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }
  defaultState = {
    input: '',
    userData: '',
    errorMessage: '',
  }

  updateDom = (e) => {
    e.preventDefault();
    if (this.state.input === '') {
      return this.setState({
        errorMessage: 'Username field is required'
      });
    }
    getUserData(`https://api.github.com/users/${this.state.input}`)
      .then(data => {
        if (data === "error") {
          return this.setState({ errorMessage: 'Something went wrong try again later!' })
        } else if (data === "not valid user") {
          return this.setState({ errorMessage: 'Not a valid GitHub username' })
        }
        return this.setState({ userData: data });
      })
      .catch(err => {
        console.log(`fetch getUserData failed ${err.message}`)
        this.setState({ errorMessage: 'Something went wrong try again later!' });
      });
  }

  render() {
    const { input, userData } = this.state;
    if (userData === '') {
      return (<section id="section-form">
        <form className="form" onSubmit={this.getUserData}>
          <label htmlFor="username-input">
            Enter any GitHub Username:
            <br />
            <input className="form__input" id="username-input" value={input} onChange={e => this.setState({ input: e.target.value })} />
          </label>
          <br />
          <Button onClick={this.updateDom}>Play!</Button>
          <p>{this.state.errorMessage}</p>
        </form>

      </section>)
    }
    return (
      <React.Fragment>
        <Button onClick={() => this.setState(this.defaultState)}>Log Out</Button>
        {userData && <UserCard data={userData} />}
      </React.Fragment>

    )
  }
}