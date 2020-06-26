import React, { useEffect } from "react";
import { useRoute } from "react-router5";
import Game from "../../../service/Game";
export default (props) => {
  const { router } = useRoute();
  useEffect(() => {
    let f = async () => {
      console.log(await new Game().getMyMeta());
      console.log(await new Game().getMyQuest());
    };
    f();
  }, []);
  return (
    <div>
      <div>PAGE :{router.getState().name}</div>
      <div onClick={() => router.navigate("home")}>{"<BACK"}</div>
    </div>
  );
};
