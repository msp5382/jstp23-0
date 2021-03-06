import React, { useEffect, useState } from "react";
import { useRoute } from "react-router5";
import { Navbar, Body } from "../../component";
import styled from "styled-components";
import Game from "../../service/Game";
const Location = styled.img`
  max-height: 200px;
  margin-top: auto;
  margin-bottom: auto;
  &:hover {
    opacity: 0.5;
  }
`;
export default (props) => {
  const { router } = useRoute();
  const [userTime, setTime] = useState();
  const [quest, setQuest] = useState();
  useEffect(() => {
    const game = new Game();
    const f = async () => {
      const { time } = await game.getMyMeta();
      console.log("found time", time);
      setTime(time);
      const quest = await game.getMyQuest();
      setQuest(quest);
    };
    f();
  }, []);
  return (
    <div>
      <Navbar
        onGoBack={() => router.navigate("home")}
        pageName={"เลือกสถานที่"}></Navbar>
      <Body>
        {userTime ? (
          <>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <Location
                  onClick={() =>
                    router.navigate("choose_quest", {
                      location: 1,
                      quest: quest,
                    })
                  }
                  src={`/assets/location/${userTime}0.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col d-flex justify-content-center">
                <Location
                  onClick={() =>
                    router.navigate("choose_quest", {
                      location: 2,
                      quest: quest,
                    })
                  }
                  src={`/assets/location/${userTime}1.png`}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <Location
                  onClick={() =>
                    router.navigate("choose_quest", {
                      location: 3,
                      quest: quest,
                    })
                  }
                  src={`/assets/location/${userTime}2.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col d-flex justify-content-center">
                <Location
                  onClick={() =>
                    router.navigate("choose_quest", {
                      location: 4,
                      quest: quest,
                    })
                  }
                  src={`/assets/location/${userTime}3.png`}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-6 d-flex justify-content-center">
                <Location
                  onClick={() =>
                    router.navigate("choose_quest", {
                      location: 5,
                      quest: quest,
                    })
                  }
                  src={`/assets/location/${userTime}4.png`}
                  className="img-fluid"
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </Body>
    </div>
  );
};
