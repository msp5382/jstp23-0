import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RouterProvider } from "react-router5";
import createRouter from "./router";
import startFirebase from "./service/startFirebase";
import Auth from "./service/Auth";
const router = createRouter();

startFirebase();
new Auth().getUserDataListener((s) => {});

router.start(() => {
  ReactDOM.render(
    <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
