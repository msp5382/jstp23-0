import React from "react";
import styled from "styled-components";
const Box = styled.input`
  background-color: #fff6e0;
  border: none;
  padding: 5px;
  border-radius: 3px;
  &:focus {
    border: none;
  }
`;
const Area = styled.textarea`
  background-color: #fff6e0;
  border: none;
  padding: 5px;
  border-radius: 3px;
  &:focus {
    border: none;
  }
  width: 100%;
`;

export default (props) => {
  if (props.area) {
    return <Area {...props} />;
  } else {
    return <Box {...props} />;
  }
};
