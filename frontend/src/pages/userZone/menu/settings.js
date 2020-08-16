import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "react-router5";
import styled from "styled-components";
import UserProfile from "../../../service/UserProfile";
import Auth from "../../../service/Auth";
import { Navbar, Body, TextBox, Button } from "../../../component";
const ChangeImage = styled.div`
  height: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 100px;
  font-size: 10px;
  text-align: center;
`;
const FileInput = styled.input`
  opacity: 0;
  width: 100%;
`;
const User = new UserProfile();
export default (props) => {
  const { router } = useRoute();
  const [username, setUsername] = useState();
  const [picture, setPicture] = useState();
  const file = useRef();
  let oldUserName = User.getUser().displayName;
  useEffect(() => {
    const { displayName } = User.getUser();
    setUsername(displayName);
    User.getUserProfileImg().then((e) => setPicture(e));
  }, []);
  return (
    <>
      <Navbar pageName="การตั้งค่า" onGoBack={() => router.navigate("home")} />
      <Body>
        <div className="row justify-content-center">
          <div style={{ width: 100 }}>
            <img
              src={picture}
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <ChangeImage onClick={() => {}}>
              <FileInput
                ref={file}
                onChange={(e) => {
                  User.setProfilePicture(file.current.files[0]).then(() =>
                    User.getUserProfileImg().then((e) => setPicture(e))
                  );
                }}
                accept=".jpg, .jpeg, .png"
                type="file"
              />
              <div style={{ marginTop: "-20px" }}>เปลี่ยน</div>
            </ChangeImage>
          </div>
        </div>
        <div className="row mt-3 justify-content-center">
          <div className="col"></div>
          <div className="row">
            <div className="col-md-2 col-sm-2">Name:</div>
            <div className="col">
              <TextBox
                style={{ width: "90%" }}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="col"></div>
        </div>

        <div className="row mt-3 justify-content-center">
          <div className="col"></div>
          <div className="row">
            <div className="col-md-2 col-sm-2">ปรับแต่งตัวละคร:</div>
            <div className="col">
              <Button
                onClick={() => {
                  window.location = "/character_edit";
                }}
                text={"ไปปรับแต่งตัวละคร"}></Button>
            </div>
          </div>
          <div className="col"></div>
        </div>

        <div className="row mt-3 justify-content-center">
          <div className="col"></div>
          <div className="row">
            <div className="col-md-2 col-sm-2">ปรับแต่งตัวละคร:</div>
            <div className="col">
              <Button
                onClick={() => {
                  new Auth().signOut().then(() => (window.location = "/login"));
                }}
                text={"ออกจากระบบ"}></Button>
            </div>
          </div>
          <div className="col"></div>
        </div>

        <div></div>
        {username != oldUserName &&
        username != undefined &&
        username != null &&
        username != "" ? (
          <div className="row justify-content-end mr-4 mt-2">
            <Button
              onClick={() => {
                User.setUsername(username).then(() => alert("บันทึกแล้ว!"));
              }}
              text={"Save"}></Button>
          </div>
        ) : (
          <></>
        )}
      </Body>
    </>
  );
};
