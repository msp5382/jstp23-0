import routes from "./routes";
export default (router, dependencies) => async (toState, fromState) => {
  let toRoute = routes.find((r) => r.name == toState.name);
  if (toRoute) {
    console.log("toRoute", toRoute);
    toState.component = toRoute.component;
  }
  return toState;
};
