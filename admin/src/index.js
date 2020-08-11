import React from "react";
import ReactDOM from "react-dom";
import startFirebase from "./service/startFirebase";

import App from "./App.js";
startFirebase();

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById("root")
);
