import React, { useEffect, useState } from "react";
import { useRoute } from "react-router5";
import styled from "styled-components";
import UserProfile from "../../../service/UserProfile";
import { Navbar, Body, Button } from "../../../component";
import { WorldHistoryData, history } from "./historyData";
import Game from "../../../service/Game";
const WorldHistory = styled.div`
  padding: 10px;
  font-size: 14px;
  overflow: scroll;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: #d2b88b;
  height: calc(80vh - 100px);
`;
const ButtonCon = styled(Button)`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
`;
export default (props) => {
  const { router } = useRoute();
  const [time, setTime] = useState("X");

  const [worldTime, setWorldTime] = useState(0);

  const User = new UserProfile();
  const [viewByTime, setViewByTime] = useState(false);
  const ThisGame = new Game();
  useEffect(() => {
    User.getMyTime().then((Utime) => {
      setTime(Utime);
    });
    ThisGame.getWorldTime().then((time) => {
      setWorldTime(time);
    });
  }, []);

  return (
    <>
      <Navbar
        pageName="ประวัติศาสตร์โลก"
        onGoBack={() => router.navigate("home")}
      />
      <Body>
        <WorldHistory>
          {viewByTime
            ? history[time].slice(0, worldTime).join("\n")
            : WorldHistoryData}
        </WorldHistory>

        <ButtonCon
          onClick={() => {
            setViewByTime(!viewByTime);
          }}
          text={
            viewByTime ? "ดูประวัติศาสตร์โลก" : "ดูประวัติศาสตร์ในยุคฉัน"
          }></ButtonCon>
      </Body>
    </>
  );
};
