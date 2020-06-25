import React from "react";
import { useRoute } from "react-router5";
import { Navbar, Body } from "../../component";
import styled from "styled-components";
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

const QuestChoice = (props) => {
  if (props.main) {
    return (
      <QuestBox
        onClick={() => props.router.navigate("view_quest", { id: props.id })}>
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
  console.log();
  return (
    <div>
      <Navbar
        onGoBack={() => router.navigate("quest")}
        pageName={"เลือกเควส " + router.getState().params.location}></Navbar>
      <PageBody>
        <QuestChoice main router={router} id={123} text="เควส" />
        <QuestChoice router={router} id={123} text="เควส" />
      </PageBody>
    </div>
  );
};
