import React, { useEffect, useState, useRef } from "react";
import UserProfile from "../../../service/UserProfile";
import styled from "styled-components";
import { Navbar, Body, Button } from "../../../component";

import { useRoute } from "react-router5";
import {
  getCharacterBuildIndex,
  UploadUserCharacter,
} from "../../../service/Register";
import Game from "../../../service/Game";
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
  margin: 5px;
`;

const buildHairPathString = (hairEnum) => {
  if (hairEnum.includes("_M")) {
    return {
      F: `/assets/characterGen/D_Hair/D_H_${hairEnum
        .replace("HAIR", "")
        .replace("_M", "")}_F.png`,
    };
  } else {
    return {
      F: `/assets/characterGen/D_Hair/D_H_${hairEnum.replace(
        "HAIR",
        ""
      )}_F.png`,
      B: `/assets/characterGen/D_Hair/D_H_${hairEnum.replace(
        "HAIR",
        ""
      )}_B.png`,
    };
  }
};

const buildPathString = (file, time) => {
  if (file.includes("FACE")) {
    return `/assets/characterGen/D_Face/D_F${file.replace("FACE", "")}.png`;
  } else {
    return `/assets/characterGen/D_${time}/D_${time}${file}.png`;
  }
};

const buildPreviewString = (file, time) => {
  if (file.includes("FACE")) {
    return `/assets/characterGen/D_Face/D_F${file.replace("FACE", "")}_P.png`;
  } else if (file.includes("HAIR")) {
    return `/assets/characterGen/D_Hair/D_H_${file
      .replace("HAIR", "")
      .replace("_M", "")}_F_P.png`;
  } else {
    return `/assets/characterGen/D_${time}/D_${time}${file}_P.png`;
  }
};
export default (props) => {
  const { router } = useRoute();
  const [_time, setTime] = useState("X");
  const [userName, setUserName] = useState("");
  const [characterBuildIndex, setCharacterBuildIndex] = useState([]);
  const [customData, setCustomData] = useState([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const Canvas = useRef();
  const UserTime = "X";

  const createBlankCharacter = () => {
    const Context = Canvas.current.getContext("2d");
    //Context.clearRect(0, 0, Canvas.current.width, Canvas.current.height);
    const Base = new Image();
    Base.src = `/assets/characterGen/BLANK.png`;
    Base.onload = () => {
      Context.drawImage(Base, 0, 0, Base.width * 0.15, Base.height * 0.15);
    };
  };

  useEffect(() => {
    (async () => {
      const game = new Game();
      const { time } = await game.getMyMeta();
      setCharacterBuildIndex(await getCharacterBuildIndex(time));
      setTime(time);
    })();
    setUserName(new UserProfile().getUser().displayName);

    const Context = Canvas.current.getContext("2d");
    // const Base = new Image();
    // Base.src = `/assets/characterGen/BLANK.png`;
    // Base.onload = () => {
    //   Context.drawImage(Base, 0, 0, Base.width * 0.15, Base.height * 0.15);
    // };
    Context.clearRect(0, 0, Canvas.current.width, Canvas.current.height);
    createBlankCharacter();
  }, []);

  useEffect(() => {
    (async () => {
      const Context = Canvas.current.getContext("2d");
      Context.clearRect(0, 0, Canvas.current.width, Canvas.current.height);
      createBlankCharacter();
      if (customData.length != 0) {
        const _customData = customData.sort((a, b) => {
          if (!a.includes("HAIR") && b.includes("HAIR")) return 1;
          else return -1;
        });
        console.log(_customData);
        //_customData.map((item, i) => {
        let j = _customData.length;
        for (let i = 0; i < j; i++) {
          const item = _customData[i];
          console.log("making", item);
          if (item.includes("HAIR") && item.includes("_M")) {
            let AddingImage = new Image();
            AddingImage.src = buildHairPathString(item)["F"];
            AddingImage.onload = () => {
              Context.drawImage(
                AddingImage,
                0,
                0,
                AddingImage.width * 0.15,
                AddingImage.height * 0.15
              );
            };
          } else if (item.includes("HAIR") && !item.includes("_M")) {
            Context.clearRect(
              0,
              0,
              Canvas.current.width,
              Canvas.current.height
            );
            let AddingImage = new Image();
            AddingImage.src = buildHairPathString(item)["B"];

            await new Promise(
              (res, rej) =>
                (AddingImage.onload = () => {
                  Context.drawImage(
                    AddingImage,
                    0,
                    0,
                    AddingImage.width * 0.15,
                    AddingImage.height * 0.15
                  );
                  createBlankCharacter();
                  const AddingImageBack = new Image();
                  AddingImageBack.src = buildHairPathString(item)["F"];
                  AddingImageBack.onload = () => {
                    Context.drawImage(
                      AddingImageBack,
                      0,
                      0,
                      AddingImageBack.width * 0.15,
                      AddingImageBack.height * 0.15
                    );
                  };
                  console.log("complete draw");
                  res();
                })
            );
          } else {
            let AddingImage = new Image();
            AddingImage.src = buildPathString(item, _time);
            AddingImage.onload = () => {
              Context.drawImage(
                AddingImage,
                0,
                0,
                AddingImage.width * 0.15,
                AddingImage.height * 0.15
              );
            };
          }
          //});
        }
      }
    })();
  }, [customData]);

  const addCustomData = (selected) => {
    if (customData.includes(selected)) {
      setCustomData(customData.filter((c) => c !== selected));
    } else {
      setCustomData([...customData, selected]);
    }
  };
  return (
    <div style={{ touchAction: "pan-y" }}>
      <Navbar
        onGoBack={() =>
          router.navigate(
            router.getState().params?.settings ? "settings" : "character_gen"
          )
        }
        pageName="สร้างตัวละคร"
      />
      <PageBody>
        <div class="row justify-content-center">
          <BodyCanvas ref={Canvas} width="300" height="500"></BodyCanvas>
        </div>
        <div class="d-flex flex-wrap justify-content-center ">
          {characterBuildIndex.map((c, i) => (
            <Options
              onClick={() => {
                addCustomData(c);
              }}
              selected={customData.includes(c)}
              key={i}>
              <img
                alt="options"
                style={{ width: "auto", height: "calc(100% - 5px)" }}
                src={buildPreviewString(c, _time)}></img>
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
    </div>
  );
};
