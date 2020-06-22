import React from "react";
import { BaseLink, useRoute } from "react-router5";
import { Navbar, Body } from "../../component";
export default (props) => {
  const { router } = useRoute();

  return (
    <div>
      <Navbar
        onGoBack={() => router.navigate("quest")}
        pageName={"เลือกเควส"}></Navbar>
      <Body>
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
      </Body>
    </div>
  );
};
