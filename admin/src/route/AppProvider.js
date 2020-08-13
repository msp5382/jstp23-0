import React, { useEffect } from "react";
import URL from "url-parse";
import routes from "./routes";
export default (props) => {
  const Component = routes[URL(window.location.href).pathname];

  return <Component params={URL(window.location.href, true).query}></Component>;
};
