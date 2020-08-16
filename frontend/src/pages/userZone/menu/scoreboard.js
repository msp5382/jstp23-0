import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "react-router5";
import styled from "styled-components";
import UserProfile from "../../../service/UserProfile";
import { Navbar, Body, TextBox, Button } from "../../../component";
const User = new UserProfile();

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
`;
const Wrap = styled.div`
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
`;

const UserBox = styled.div`
  text-align: center;
  margin: 10px;
`;
export default (props) => {
  const { router } = useRoute();
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    (async () => {
      setAllUser(await User.getAllUsers());
    })();
  }, []);
  return (
    <>
      <Navbar pageName="เพื่อนค่าย" onGoBack={() => router.navigate("home")} />
      <Body>
        <Wrap>
          {allUser.map(({ data: user }) => (
            <UserBox>
              <Image src={user?.profileImg || "/assets/example_user.png"} />
              <div>{user.displayName}</div>
            </UserBox>
          ))}
        </Wrap>
      </Body>
    </>
  );
};
