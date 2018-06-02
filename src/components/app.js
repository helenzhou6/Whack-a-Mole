import React from "react";
import Form from "./form/form";
import { Header } from "./header/header";
import "../../public/style.css";

export default class App extends React.Component {
  render() {
    return (<div className="card">
      <Header />
      <Form />
    </div>)
  }
}
