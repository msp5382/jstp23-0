import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "react-router5";
import { Navbar, Body, Button, TextBox } from "../../component";
import Game from "../../service/Game";
import styled from "styled-components";
import { IoIosCamera } from "react-icons/io";
import { FireworkSpinner } from "react-spinners-kit";
const PageBody = styled(Body)`
  position: relative;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

const Content = styled.div`
  padding: 10px;
  font-size: 14px;
  overflow: scroll;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: #d2b88b;
  height: fit-content;
`;
const AddPic = styled.div`
  width: fit-content;
  background-color: #d2b88b;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ImgPreviewBox = styled.div`
  width: fit-content;
  background-color: #d2b88b;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
`;

const RowBetween = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: space-between;
`;

const Answer = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 15px;
  height: fit-content;
  margin-bottom: 20px;
  ${(props) => (props.locked ? "opacity : 0.3;" : "")}
`;

export default (props) => {
  const { router } = useRoute();
  const [quest, setQuest] = useState();
  const [imgPreview, setImgPreview] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [moreImgComing, setMoreImgComing] = useState(false);
  const file = useRef();
  useEffect(() => {
    const f = async () => {
      setQuest(await new Game().getQuest(router.getState().params.quest));
    };
    f();
  }, []);
  console.log(quest);
  return (
    <div>
      <Navbar
        onGoBack={() => {
          if (router.getState().params.lastLocat) {
            router.navigate("view_quest", {
              id: router.getState().params.quest,
            });
          } else {
            router.navigate("quest");
          }
        }}
        pageName={"ทำภารกิจ"}></Navbar>
      <PageBody>
        <Content>{quest ? quest.quest : <></>}</Content>
        <Answer>
          {quest ? (
            <>
              <TextBox
                area
                style={{ width: "100%" }}
                onChange={(e) => {
                  setAnswerText(e.target.value);
                }}
                value={answerText}
                placeholder="คำตอบ"></TextBox>
              <RowBetween>
                <AddPic style={{ width: "fit-content" }}>
                  <IoIosCamera></IoIosCamera>แนบรูปภาพหรือวิดีโอ
                  <input
                    ref={file}
                    type="file"
                    onChange={() => {
                      setMoreImgComing(true);
                      new Game()
                        .addContentToQuestAnswer(file.current.files[0])
                        .then((url) => {
                          setImgPreview([...imgPreview, url]);
                          setMoreImgComing(false);
                        });
                    }}
                  />
                </AddPic>
              </RowBetween>
              {moreImgComing || imgPreview.length > 0 ? (
                <ImgPreviewBox>
                  {imgPreview.map((url) => (
                    <img
                      src={url}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "contain",
                      }}></img>
                  ))}

                  {moreImgComing ? (
                    <div
                      style={{
                        padding: 20,
                      }}>
                      <FireworkSpinner></FireworkSpinner>
                    </div>
                  ) : (
                    <></>
                  )}
                </ImgPreviewBox>
              ) : (
                <></>
              )}

              <RowBetween>
                <div></div>
                <Button
                  style={{ width: "fit-content" }}
                  text="ส่งคำตอบ"
                  onClick={() => {
                    new Game()
                      .submitQuestAnswer(
                        answerText,
                        imgPreview,
                        quest.id,
                        quest.time
                      )
                      .then(() => {
                        if (router.getState().params.startWithChoice) {
                          router.navigate("home", {});
                        } else {
                          router.navigate("view_quest", {
                            id: quest.id,
                            lastLocat: quest.location,
                            doneQuest: true,
                          });
                        }
                      });
                  }}></Button>
              </RowBetween>
            </>
          ) : (
            <></>
          )}
        </Answer>
      </PageBody>
    </div>
  );
};
