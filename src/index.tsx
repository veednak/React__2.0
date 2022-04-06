import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <h1>TODO LIST</h1>
    <App></App>
  </React.StrictMode>,
  document.getElementById("root")
);
