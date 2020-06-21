import routes from "./routes";
import Auth from "../service/Auth";
export default (router, dependencies) => async (toState, fromState) => {
  let toRoute = routes.find((r) => r.name === toState.name);
  if (toRoute) {
    console.log(new Auth().isLogin());
    toState.component = toRoute.component;
    if (toRoute.needLogin) {
      if (new Auth().isLogin()) {
        return toState;
      } else {
        return Promise.reject({ redirect: { name: "login" } });
      }
    } else {
      return toState;
    }
  }
};
