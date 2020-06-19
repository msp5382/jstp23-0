import React from "react";
import { BaseLink, useRoute } from "react-router5";

export default (props) => {
  const { router } = useRoute();

  return (
    <div style={{ backgroundColor: "#000" }}>
      พ่องตาย
      <BaseLink router={router} routeName="index">
        รืกำำำ
      </BaseLink>
      <div>{router.getState().name}</div>
      <div
        onClick={() => {
          window.location = "/test1";
        }}>
        Test1 gogo
      </div>
    </div>
  );
};
