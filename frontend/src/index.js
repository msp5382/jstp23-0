import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/index";
import { RouterProvider } from "react-router5";
import createRouter from "./service/router";

const router = createRouter();

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
