import React from "react";
import { BaseLink, useRoute } from "react-router5";
import { Navbar, Body } from "../../component";
export default (props) => {
  const { router } = useRoute();

  return (
    <div>
      <Navbar
        onGoBack={() =>
          router.navigate("choose_quest", {
            location: router.getState().params.lastLocat,
          })
        }
        pageName={""}></Navbar>
      <Body></Body>
      <div>PAGE :{router.getState().name}</div>
      <div>VIEWING :{router.getState().params.id}</div>
      <div onClick={() => router.navigate("home")}>{"<BACK"}</div>
      TODO: fetch quest id : {router.getState().params.id}
    </div>
  );
};
