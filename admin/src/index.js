import React from "react";
import ReactDOM from "react-dom";
import startFirebase from "./service/startFirebase";
import AppProvider from "./route/AppProvider";
import "./styles/styled.css";

startFirebase();
// APIKEY : AIzaSyCXeL3bF3hy5m7eR9cGWUup49YpjXfbJbs
// CLient id 625572923280-tb9gmco3pacm23slo6tp0mqmvq3gct4g.apps.googleusercontent.com
// Secret mUuGB8DuHSFYlVk745SoNQCV
ReactDOM.render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
  document.getElementById("root")
);
