import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RouterProvider } from "react-router5";
import createRouter from "./router";
import startFirebase from "./service/startFirebase";
import Auth from "./service/Auth";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const router = createRouter();

Sentry.init({
  dsn:
    "https://d66204d6a5224b31a4b525d18d03969d@o375495.ingest.sentry.io/5425654",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Registering Sequence
// Change comment in Character Edit
// Clear User and Chat
// Trigger World data

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
