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
  height: fit-content;
`;

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
        pageName={"เรียบร้อย"}></Navbar>
      <PageBody>
        <Content>
          คุณได้ทำภารกิจและใช้สิทธิ์ของคุณเปลี่ยนแปลงอนาคตแล้ว
          มารอดูกันว่าจะเกิดอะไรขึ้น!
        </Content>
        <Button
          text="กลับหน้าหลัก"
          onClick={() => {
            router.navigate("home");
          }}
          style={{ margin: "auto", marginTop: 10 }}></Button>
      </PageBody>
    </div>
  );
};
