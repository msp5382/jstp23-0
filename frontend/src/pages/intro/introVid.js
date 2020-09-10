import React from "react";
import { BaseLink, useRoute } from "react-router5";
import styled from "styled-components";
const DarkBG = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #000;
`;
export default (props) => {
  const { router } = useRoute();

  return <DarkBG>TikTok Liked</DarkBG>;
};
