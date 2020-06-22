import React from "react";
import { BaseLink, useRoute } from "react-router5";
import { Navbar, Body } from "../../component";
export default (props) => {
  const { router } = useRoute();

  return (
    <div>
      <Navbar
        onGoBack={() => router.navigate("home")}
        pageName={"เควส"}></Navbar>
      <Body>
        <div onClick={() => router.navigate("choose_quest", { location: 1 })}>
          <br />
          location1
        </div>
        <div onClick={() => router.navigate("choose_quest", { location: 2 })}>
          <br />
          location2
        </div>
        <div onClick={() => router.navigate("choose_quest", { location: 3 })}>
          <br />
          location3
        </div>
        <div onClick={() => router.navigate("choose_quest", { location: 4 })}>
          <br />
          location4
        </div>
        <div onClick={() => router.navigate("choose_quest", { location: 5 })}>
          <br />
          location5
        </div>
      </Body>
    </div>
  );
};
