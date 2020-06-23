import React from "react";
import styled from "styled-components";
const Wrap = styled.div`
  width: fit-content;
  background-color: #e9d3a6;
  padding: 5px;
  font-size: 16px;
  border-top: 4px solid #f6f5de;
  border-bottom: 4px solid #d3ba8d;
  border-right: 4px solid #d3ba8d;
  border-left: 4px solid #e9d3a6;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export default (props) => {
  return (
    <Wrap {...props} onClick={props.onClick}>
      {props.text}
    </Wrap>
  );
};
