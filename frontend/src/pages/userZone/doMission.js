import React, { useEffect, useState } from "react";
import { useRoute } from "react-router5";
import { Navbar, Body, Button, TextBox } from "../../component";
import Game from "../../service/Game";
import styled from "styled-components";

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

const EventButton = styled(Button)`
  width: 90%;
  margin: auto;
  margin-top: 8px;
  text-align: center;
  font-size: 13px;
  ${(props) => (props.locked ? `&:hover{ opacity: 1; }` : "")}
`;
const RowEnd = styled.div`
  display: flex;

  margin: auto;
  justify-content: flex-end;
`;

const Answer = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 15px;
  height: fit-content;
  margin-bottom: 20px;
  ${(props) => (props.locked ? "opacity : 0.3;" : "")}
`;

const Response = (props) => {
  switch (props.type) {
    case "String":
      return (
        <TextBox area style={{ width: "100%" }} placeholder="คำตอบ"></TextBox>
      );
      break;

    default:
      break;
  }
};

export default (props) => {
  const { router } = useRoute();
  const [quest, setQuest] = useState();
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
              <Response type={quest.answerType}></Response>
              <RowEnd>
                <Button
                  style={{ marginTop: "10px", width: "fit-content" }}
                  text="ส่งคำตอบ"></Button>
              </RowEnd>
            </>
          ) : (
            <></>
          )}
        </Answer>
      </PageBody>
    </div>
  );
};
