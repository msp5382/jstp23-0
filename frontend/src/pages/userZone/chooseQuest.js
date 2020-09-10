import React, { useEffect, useState } from "react";
import { useRoute } from "react-router5";
import { Navbar, Body } from "../../component";
import styled from "styled-components";
import Game from "../../service/Game";
import Admin from "../../service/Admin";
import moment from "moment";
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
const TextCenter = styled.div`
  text-align: center;
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
  moment.updateLocale("en", {
    relativeTime: {
      future: "ใน %s",
      s: "a ไม่กี่วินาที",
      ss: "%d วินาที",
      m: "นาที",
      mm: "%d นาที",
      h: "ชั่วโมง",
      hh: "%d ชั่วโมง",
      d: "วัน",
      dd: "%d วัน",
      w: "สัปดาห์",
      ww: "%d สัปดาห์",
      M: "เดือน",
      MM: "%d เดือน",
      y: "ปี",
      yy: "%d ปี",
    },
  });
  useEffect(() => {
    let f = async () => {
      const UserGame = await new Game().getMyQuest();
      console.log(UserGame);
      if (UserGame) {
        setQuestData(UserGame);
      }
    };

    f();
  }, []);
  return (
    <div>
      <Navbar
        onGoBack={() => router.navigate("quest")}
        pageName={"เลือกเควส " + router.getState().params.location}></Navbar>
      <PageBody>
        {questData.map((q) =>
          router.getState().params.location === q.location ? (
            <QuestChoice
              main
              location={router.getState().params.location}
              router={router}
              id={q.id}
              text="เควสประจำวัน"
              description={`หมดอายุ ${moment(q.expTime)
                .locale("th")
                .fromNow()}`}
            />
          ) : (
            <></>
          )
        )}
        {console.log(questData)}
        {questData.filter(
          (q) => router.getState().params.location === q.location
        ).length === 0 ? (
          <TextCenter>ไม่มีเควสในบริเวณนี้</TextCenter>
        ) : (
          <></>
        )}
      </PageBody>
    </div>
  );
};
