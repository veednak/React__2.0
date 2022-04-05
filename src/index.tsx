import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/layout";
import { App } from "./components/App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <h1>TODO LIST</h1>
      <App></App>
    </Layout>
  </React.StrictMode>,
  document.getElementById("root")
);
