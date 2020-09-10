import React, { useEffect, useState, useRef } from "react";
import UserProfile from "../../../service/UserProfile";
import styled from "styled-components";
import { Navbar, Body, Button } from "../../../component";

import { useRoute } from "react-router5";
import {
  getCharacterBuildIndex,
  UploadUserCharacter,
} from "../../../service/Register";
const PageBody = styled(Body)`
  padding-left: 15px;
  padding-right: 15px;
`;

const NextButton = styled(Button)`
  margin-left: auto;
`;
const BodyCanvas = styled.canvas`
  margin: auto;
  width: 300px;
`;

const Options = styled.div`
  ${(props) => (props.selected ? `border: 2px solid #7b3a08;` : ``)}
  border-radius: 5px;
  width: 60px;
  height: 60px;
  background-color: #fff;
  padding: 5px;
  cursor: pointer;
`;
const buildPathString = (file, time) =>
  `/assets/characterGen/${time}/T_${time}0_${file}.png`;
const buildPreviewString = (file, time) =>
  `/assets/characterGen/${time}/T_${time}0_${file}_P.png`;
export default (props) => {
  const { router } = useRoute();
  const [userName, setUserName] = useState("");
  const [characterBuildIndex, setCharacterBuildIndex] = useState([]);
  const [customData, setCustomData] = useState([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const Canvas = useRef();
  const UserTime = "X";
  useEffect(() => {
    (async () => {
      setCharacterBuildIndex(await getCharacterBuildIndex(UserTime));
    })();
    setUserName(new UserProfile().getUser().displayName);

    const Context = Canvas.current.getContext("2d");
    const Base = new Image();
    Base.src = buildPathString("BLANK", UserTime);
    Base.onload = () => {
      Context.drawImage(Base, 0, 0, Base.width * 0.25, Base.height * 0.25);
    };
  }, []);

  useEffect(() => {
    const Context = Canvas.current.getContext("2d");
    const Base = new Image();
    Base.src = buildPathString("BLANK", UserTime);
    Base.onload = () => {
      Context.drawImage(Base, 0, 0, Base.width * 0.25, Base.height * 0.25);
    };
    customData.map((item) => {
      let AddingImage = new Image();
      AddingImage.src = buildPathString(item, UserTime);
      AddingImage.onload = () => {
        Context.drawImage(
          AddingImage,
          0,
          0,
          AddingImage.width * 0.25,
          AddingImage.height * 0.25
        );
      };
    });
  }, [customData]);

  const addCustomData = (selected) => {
    if (customData.includes(selected)) {
      setCustomData(customData.filter((c) => c !== selected));
    } else {
      setCustomData([...customData, selected]);
    }
  };
  return (
    <>
      <Navbar
        onGoBack={() => router.navigate("character_gen")}
        pageName="สร้างตัวละคร"
      />
      <PageBody>
        <div class="row justify-content-center">
          <BodyCanvas ref={Canvas} width="300" height="500"></BodyCanvas>
        </div>
        <div class="d-flex justify-content-between">
          {characterBuildIndex.map((c, i) => (
            <Options
              onClick={() => {
                addCustomData(c);
              }}
              selected={customData.includes(c)}
              key={i}>
              <img alt="options" src={buildPreviewString(c, UserTime)}></img>
            </Options>
          ))}
        </div>
        <NextButton
          style={{ marginLeft: "auto", marginTop: 10 }}
          text={!isBuilding ? "ถัดไป >" : "กำลังสร้างตัวละคร"}
          onClick={() => {
            setIsBuilding(true);
            Canvas.current.toBlob((b) => {
              UploadUserCharacter(b).then((url) => {
                console.log(url);
                setIsBuilding(false);
                window.location = "/home";
                //alert(
                //  "การสมัครเสร็จเรียบร้อย ระบบจะเปิดให้ท่านเข้าใช้ในวันพรุ่งนี้"
                //);
              });
            });
          }}></NextButton>
      </PageBody>
    </>
  );
};
