import React from "react";
import ReactDOM from "react-dom";
import startFirebase from "./service/startFirebase";
import AppProvider from "./route/AppProvider";
import "./styles/styled.css";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn:
    "https://d66204d6a5224b31a4b525d18d03969d@o375495.ingest.sentry.io/5425654",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
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
