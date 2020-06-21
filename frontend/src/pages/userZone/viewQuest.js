import React from "react";
import { BaseLink, useRoute } from "react-router5";

export default (props) => {
  const { router } = useRoute();

  return (
    <div>
      <div>PAGE :{router.getState().name}</div>
      <div>VIEWING :{router.getState().params.id}</div>
      <div onClick={() => router.navigate("home")}>{"<BACK"}</div>
      TODO: fetch quest id : {router.getState().params.id}
    </div>
  );
};
