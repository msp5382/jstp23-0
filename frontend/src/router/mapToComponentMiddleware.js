import routes from "./routes";
import Auth from "../service/Auth";
import UserProfile from "../service/UserProfile";
export default (router, dependencies) => async (toState, fromState) => {
  let toRoute = routes.find((r) => r.name === toState.name);
  if (toRoute) {
    console.log(new Auth().isLogin());
    toState.component = toRoute.component;
    if (toRoute.needLogin) {
      if (new Auth().isLogin()) {
        if (toRoute.admin) {
          if (
            //new UserProfile().getUser().uid === "rQj27NjuLNXRTR5ygS0DTkNuCop1"
            true
          ) {
            return toState;
          } else {
            return Promise.reject({ redirect: { name: "login" } });
          }
        } else {
          return toState;
        }
      } else {
        return Promise.reject({ redirect: { name: "login" } });
      }
    } else {
      return toState;
    }
  }
};
