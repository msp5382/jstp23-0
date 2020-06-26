import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserProfile from "../service/UserProfile";
const NavPos = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;
const NavFilled = styled.div`
  width: 100%;
  padding-top: 10px;
  height: 50px;
  background-color: #55361c;
  color: white;
  text-align: center;
  border-bottom: 3px solid black;
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
`;
const Space = styled.div`
  height: 50px;
`;

const ProfileImage = styled.img`
  height: 100px;
  width: 90px;
  align-self: flex-end;
  z-index: 11;
  position: absolute;
`;
const Image = styled.img`
  height: 90px;
  object-fit: cover;
  width: 80px;
  align-self: flex-end;
  margin-top: 2px;
  margin-left: 3px;
  z-index: 10;
  position: absolute;
`;
const BackButton = styled.img`
  width: 70px;
  &:hover {
    opacity: 0.5;
  }
`;

let CachedImage;
export default (props) => {
  const [profileImgURL, setProfileImgURL] = useState(
    CachedImage ?? "/assets/example_user.png"
  );
  useEffect(() => {
    new UserProfile().getUserProfileImg().then((u) => {
      CachedImage = u;
      setProfileImgURL(u);
    });
  }, []);
  return (
    <>
      <NavPos>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-11 col-sm-11">
            <NavFilled>
              <div className="row">
                <div className="col">
                  <div>{props.pageName}</div>
                </div>
              </div>
            </NavFilled>

            <div className="row d-flex justify-content-end">
              <div style={{ height: 100, width: 130, marginTop: "-40px" }}>
                <ProfileImage src="/assets/profileFrame.png" />
                <Image src={profileImgURL} />
              </div>
            </div>

            {props.onGoBack ? (
              <div className="row d-flex justify-content-start">
                <div
                  style={{
                    width: 130,
                    marginTop: "-60px",
                    marginLeft: "10px",
                  }}>
                  <BackButton
                    onClick={() => props.onGoBack()}
                    src="/assets/back_button.png"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="row"></div>
      </NavPos>
      <Space />
    </>
  );
};
