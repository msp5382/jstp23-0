import React from "react";
import { BaseLink, useRoute } from "react-router5";

export default () => {
  const { router } = useRoute();
  return (
    <>
      พ่องตาย
      <BaseLink router={router} routeName="compose">
        ไอควย หน้าหี
      </BaseLink>
    </>
  );
};
