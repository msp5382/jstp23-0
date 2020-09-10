import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "react-router5";
import styled from "styled-components";
import UserProfile from "../../../service/UserProfile";
import { Navbar, Body, TextBox, Button } from "../../../component";
const User = new UserProfile();

export default (props) => {
  const { router } = useRoute();
  return (
    <>
      <Navbar pageName="ช่วยเหลือ!" onGoBack={() => router.navigate("home")} />
      <Body>
        <Button
          onClick={() =>
            (window.location =
              "https://docs.google.com/forms/d/e/1FAIpQLSchFdYH4S-rAnY7BUwYwvs6OmCDjIVgRgx_XbctO2d81BDqIA/viewform?usp=send_form")
          }
          text="Report Bug"
        />
      </Body>
    </>
  );
};
