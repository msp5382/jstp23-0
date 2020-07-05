import React, { useEffect, useState } from "react";
import { useRoute } from "react-router5";
import { Navbar, Body, Button } from "../../component";
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
  flex: 2;
`;

const EventButton = styled(Button)`
  width: 90%;
  margin: auto;
  margin-top: 8px;
  text-align: center;
  font-size: 13px;
  ${(props) => (props.locked ? `&:hover{ opacity: 1; }` : "")}
`;
const Text = styled.div`
  width: 90%;
  margin: auto;

  margin-bottom: 13px;
  text-align: center;
  font-weight: bold;
`;

const EventChoice = styled.div`
  margin-top: 25px;
  height: fit-content;
  margin-bottom: 20px;
  ${(props) => (props.locked ? "opacity : 0.3;" : "")}
`;

const HideBadge = styled(Button)`
  position: absolute;
  width: 150px;
  bottom: 13%;
  left: calc(50% - 75px);
  z-index: 99;
  text-align: center;
`;

export default (props) => {
  const { router } = useRoute();
  const [quest, setQuest] = useState();
  const [lockState, setLockState] = useState(true);
  useEffect(() => {
    const f = async () => {
      setQuest(await new Game().getQuest(router.getState().params.id));
    };
    f();
  }, []);
  console.log(quest);
  return (
    <div>
      <Navbar
        onGoBack={() => {
          if (router.getState().params.lastLocat) {
            router.navigate("choose_quest", {
              location: router.getState().params.lastLocat,
            });
          } else {
            router.navigate("quest");
          }
        }}
        pageName={"เควสประจำวัน"}></Navbar>
      <PageBody>
        <Content>{quest ? quest.description : <></>}</Content>
        <HideBadge
          text="ทำภารกิจเพื่อใช้สิทธิ์เลือก"
          onClick={() =>
            router.navigate("do_mission", {
              quest: router.getState().params.id,
            })
          }></HideBadge>
        <EventChoice locked={lockState}>
          <Text>คุณจะทำยังไง ?</Text>
          {quest ? (
            quest.event.map((c, i) => (
              <EventButton locked={lockState} key={i} text={c} />
            ))
          ) : (
            <></>
          )}
        </EventChoice>
      </PageBody>
    </div>
  );
};
