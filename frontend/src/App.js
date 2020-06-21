import React from "react";
import { useRoute } from "react-router5";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default (props) => {
  const { router } = useRoute();

  return (
    <>
      <div>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-11 col-sm-11">
            <div>{router.getState().component}</div>
          </div>
        </div>
      </div>
    </>
  );
};
