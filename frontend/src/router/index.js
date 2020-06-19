import createRouter from "router5";
import loggerPlugin from "router5-plugin-logger";
import browserPlugin from "router5-plugin-browser";

import routes from "./routes.js";
import mapToComponentMiddleware from "./mapToComponentMiddleware";
export default function configureRouter() {
  const router = createRouter(routes, {
    defaultRoute: "index",
  });

  router.usePlugin(loggerPlugin);

  router.usePlugin(browserPlugin());

  router.useMiddleware(mapToComponentMiddleware);

  return router;
}
