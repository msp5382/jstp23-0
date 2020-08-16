import React, { useState, useEffect } from "react";
import { useRoute } from "react-router5";
import styled from "styled-components";
import Auth from "../../service/Auth";
import UserProfile from "../../service/UserProfile";

import { Navbar } from "../../component/index";

const MenuContainer = styled.div`
  position: absolute;
  width: 100%;
`;
const RightMenu = styled.img`
  width: 100px;
  align-self: flex-end;
  margin-right: 23px;
  margin-top: 260px;
  position: fixed;
`;
const LeftMenu = styled.img`
  width: 100px;
  align-self: flex-start;
  position: absolute;
`;

const MenuIcon = styled.img`
  width: 100px;
  position: absolute;
  margin-top: ${(props) => props.margin}px;
  &:hover {
    opacity: 0.5;
  }
`;

const CharacterImage = styled.img`
  position: absolute;
  width: 300px;
  bottom: 10px;
  z-index: 9;
  margin: auto;
`;

const MenuIconRight = styled.img`
  width: 100px;
  position: absolute;
  margin-top: ${(props) => props.margin}px;
  &:hover {
    opacity: 0.5;
  }
`;
const Ground = styled.img`
  width: 100%;
  position: absolute;
  bottom: 10px;
  z-index: 0;
`;

const GroundWrap = styled.div`
  position: relative;
  height: calc(100vh - 50px);
`;
const MenuWrap = styled.div`
  position: relative;
  z-index: 10;
`;

const CrossTimeBox = styled.div`
  border: 2px solid #4c341f;
  background-color: #be9c6c;
  width: 300px;
  margin: auto;
  margin-top: 3rem;
  padding: 4px;
`;

const CrossTimeWorldData = (props) => {
  return <CrossTimeBox>เทคโนโลยี: 0 ความรู้สึก: 0 ประชากร: 0</CrossTimeBox>;
};
export default (props) => {
  const { router } = useRoute();
  const [Charcter, setCharcter] = useState("");
  useEffect(() => {
    (async () => {
      setCharcter(await new UserProfile().getUserCharacter());
    })();
  }, []);
  return (
    <div>
      <Navbar pageName={new Auth().getUserData().displayName} />

      <MenuWrap>
        <div className="row">
          <div className="col">
            <div className="row justify-content-start ml-1">
              <LeftMenu src="/assets/menu/homeLeftMenu.png" />
              <MenuIcon
                onClick={() => router.navigate("history")}
                margin={50}
                src="/assets/menu/historyMenu.png"
              />
              <MenuIcon
                onClick={() => router.navigate("scoreboard")}
                margin={140}
                src="/assets/menu/scoreboardMenu.png"
              />
              <MenuIcon
                onClick={() => router.navigate("help")}
                margin={230}
                src="/assets/menu/helpMenu.png"
              />
              <MenuIcon
                onClick={() => router.navigate("settings")}
                margin={320}
                src="/assets/menu/settingsMenu.png"
              />
            </div>
          </div>
          <div className="col"></div>
          <div className="col">
            <div className="row">
              <div className="col"></div>
              <div className="col-sm-2  col-lg-8 col-md-6">
                <div className="row ">
                  <RightMenu src="/assets/menu/homeRightMenu.png" />

                  <MenuIconRight
                    onClick={() => router.navigate("quest")}
                    margin={80}
                    src="/assets/menu/questMenu.png"
                  />
                  <MenuIconRight
                    onClick={() => router.navigate("chat")}
                    margin={180}
                    src="/assets/menu/chatMenu.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MenuWrap>
      <CrossTimeWorldData></CrossTimeWorldData>
      <div class="row justify-content-center">
        <CharacterImage alt="character" src={Charcter}></CharacterImage>
      </div>

      <GroundWrap>
        <Ground src="/assets/ground.png"></Ground>
      </GroundWrap>
    </div>
  );
};
