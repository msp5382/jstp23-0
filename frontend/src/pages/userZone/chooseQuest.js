import React, { useEffect, useState } from "react";
import { useRoute } from "react-router5";
import { Navbar, Body } from "../../component";
import styled from "styled-components";
import Game from "../../service/Game";
const QuestBox = styled.div`
  border: 7px solid #281d1d;
  position: relative;
  background: radial-gradient(#ffffff, #f4e7dc);
  flex-direction: row;
  display: flex;
  height: 100px;
  margin-top: 20px;
  &:hover {
    opacity: 0.5;
  }
`;

const Trunk = styled.div`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
`;
const PageBody = styled(Body)`
  padding-left: 30px;
  padding-right: 30px;
  height: 100vh;
  width: 100%;
`;
const QuestTopLeftCorner = styled.img`
  height: 25px;
  position: absolute;
  margin-top: -9px;
  margin-left: -9px;
`;
const QuestBottomLeftCorner = styled.img`
  height: 25px;

  position: absolute;
  bottom: -9px;
  margin-left: -9px;
`;
const QuestTopRightCorner = styled.img`
  height: 25px;

  position: absolute;
  margin-top: -9px;
  right: -9px;
`;
const QuestBottomRightCorner = styled.img`
  height: 25px;

  position: absolute;
  bottom: -9px;
  right: -9px;
`;

const QuestBadge = styled.div`
  width: 100px;
  height: 100%;
  background-color: ${(props) => props.color};
  color: #fff;
  padding-top: 15px;
  font-size: 19px;
  padding: 15px;
  text-align: center;
  flex: 0 0 auto;
  width: auto;
`;
const Name = styled.div`
  width: 100%;
  background-color: ${(props) => props.color};
  color: white;
  padding: 10px;
`;

const Desc = styled.div`
  width: 100%;
  max-height: 32px;
  overflow: hidden;
  padding: 10px;
`;

const QuestChoice = (props) => {
  if (props.main) {
    return (
      <QuestBox
        onClick={() =>
          props.router.navigate("view_quest", {
            id: props.id,
            lastLocat: props.location,
          })
        }>
        <QuestTopLeftCorner src="/assets/questBox/topLeft.png" />
        <QuestBottomLeftCorner src="/assets/questBox/bottomLeft.png" />
        <QuestTopRightCorner src="/assets/questBox/topRight.png" />
        <QuestBottomRightCorner src="/assets/questBox/bottomRight.png" />

        <QuestBadge color="#164c60">
          MAIN <br />
          QUEST
        </QuestBadge>

        <div className="col">
          <Name color="#508497">{props.text}</Name>
          <Desc>{props.description}</Desc>
        </div>
      </QuestBox>
    );
  } else {
    return (
      <QuestBox
        onClick={() => props.router.navigate("view_quest", { id: props.id })}>
        <QuestTopLeftCorner src="/assets/questBox/topLeft.png" />
        <QuestBottomLeftCorner src="/assets/questBox/bottomLeft.png" />
        <QuestTopRightCorner src="/assets/questBox/topRight.png" />
        <QuestBottomRightCorner src="/assets/questBox/bottomRight.png" />

        <QuestBadge color="#2a662a">
          FREE <br />
          QUEST
        </QuestBadge>

        <div className="col">
          <Name color="#5b927a">{props.text}</Name>
        </div>
      </QuestBox>
    );
  }
};
export default (props) => {
  const { router } = useRoute();
  const [questData, setQuestData] = useState([]);
  console.log();
  useEffect(() => {
    let f = async () => {
      console.log(await new Game().getMyMeta());
      console.log(await new Game().getMyQuest());

      console.log(
        await new Game().setMyQuest({
          questData: [
            {
              id: 123,
              name: "เควส #1",
              description:
                "ไมรัสเด็กอายุ 8 ขวบ น่าตาเฉลียวฉลาดและน่าเอ็นดู วันนี้คือวันเกิดของเขาและคุณได้บังเอิญพบกับงานเลี้ยงเล็กๆในห้องทำงานของพ่อเขา ในมือของคุณมีหนังสือเล่มหนึ่งและนั่นคงจะเป็นสิ่งสุดท้ายที่ควรจะเป็นของขวัญ เพียงแต่คุณไม่มีอะไรอย่างอื่นเลยและเวลางานจะเริ่มต้นแล้ว",
            },
            {
              id: 323,
              name: "เควส #2",
              description:
                "เวทย์มนต์คือสิ่งมหัศจรรย์ และนั่นทำให้ทุกคนเชื่อว่าเรามีอำนาจ มันทำให้อุปทานการซื้อขายสูงขึ้นจากการจัดการผังเมืองในรูปแบบที่เราเป็นไปในการถ่วงดุล คุณว่าไหมล่ะ? ",
            },
            {
              id: 423,
              name: "เควส #3",
              description:
                "เทคโนโลยีคือสิ่งที่จะพาพวกเราเข้าสู่ยุคใหม่ ผมว่าเครื่องจักรไอน้ำที่ผมประดิษฐ์ขึ้นมานี้จะเป็นประวัติศาสตร์หน้าใหม่ ที่เวทย์มนต์ก็สู้ไม่ได้ คุณว่าไหมล่ะ?",
            },
          ],
        })
      );
      setQuestData((await new Game().getMyQuest()).questData);
    };
    f();
  }, []);
  return (
    <div>
      <Navbar
        onGoBack={() => router.navigate("quest")}
        pageName={"เลือกเควส " + router.getState().params.location}></Navbar>
      <PageBody>
        {questData.map((q) => (
          <QuestChoice
            main
            location={router.getState().params.location}
            router={router}
            id={q.id}
            text={q.name}
            description={q.description}
          />
        ))}
      </PageBody>
    </div>
  );
};
