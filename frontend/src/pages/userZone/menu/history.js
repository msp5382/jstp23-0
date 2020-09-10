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

const romanize = (num) => {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};
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
            ? history[time].slice(0, worldTime).map((x, i) => (
                <>
                  {i === 0 ? (
                    <></>
                  ) : (
                    <>
                      <br /> <br />
                    </>
                  )}
                  Chapter {romanize(i + 1)} <br /> {x}
                </>
              ))
            : //.join("\n")
              WorldHistoryData.map((x, i) => (
                <>
                  {x}
                  <br /> <br />
                </>
              ))}
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
