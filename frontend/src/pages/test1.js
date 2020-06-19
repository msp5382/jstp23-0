import React from "react";
import { BaseLink, useRoute } from "react-router5";

export default (props) => {
  const { router } = useRoute();

  return (
    <div>
      พ่องตาย
      <BaseLink router={router} routeName="index">
        ไอควย หน้าหี
      </BaseLink>
      <div>{router.getState().name}</div>
      <div
        onClick={() => {
          window.location = "/index";
        }}>
        indexgogo
      </div>
    </div>
  );
};
