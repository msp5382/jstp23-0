import React from "react";
import { useRoute } from "react-router5";

export default (props) => {
  const { router } = useRoute();

  return <>{router.getState().component}</>;
};
