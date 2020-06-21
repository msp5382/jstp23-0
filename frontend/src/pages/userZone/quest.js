import React from "react";
import { BaseLink, useRoute } from "react-router5";

export default (props) => {
  const { router } = useRoute();

  return (
    <div>
      <div>
        PAGE :{router.getState().name}
        <br />
      </div>
      <div onClick={() => router.navigate("home")}>{"<BACK"}</div>
      TODO: fetch daily quest and show here
      <br />
      <div onClick={() => router.navigate("view_quest", { id: 1234 })}>
        <br />
        ดูเควสหมายเลข 1234
      </div>
      <div onClick={() => router.navigate("view_quest", { id: 2345 })}>
        <br />
        ดูเควสหมายเลข 2345
      </div>
      <div onClick={() => router.navigate("view_quest", { id: 9384 })}>
        <br />
        ดูเควสหมายเลข 9384
      </div>
    </div>
  );
};
