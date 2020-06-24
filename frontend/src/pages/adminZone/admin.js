import React from "react";
import { BaseLink, useRoute } from "react-router5";
import { Navbar, Body } from "../../component";
export default (props) => {
  const { router } = useRoute();

  return (
    <div>
      <Navbar
        onGoBack={() => router.navigate("home")}
        pageName={"แอดมิน"}></Navbar>
      <Body></Body>
    </div>
  );
};
