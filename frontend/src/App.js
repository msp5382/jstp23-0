import React from "react";
import { useRoute } from "react-router5";

import "bootstrap/dist/css/bootstrap.min.css";

export default (props) => {
  const { router } = useRoute();

  return (
    <>
      <div>{router.getState().component}</div>
    </>
  );
};
