import React, { useState } from "react";
import { useRoute } from "react-router5";
import Auth from "../service/Auth";
import styled from "styled-components";

import { TextBox, Button } from "../component";

const TopSection = styled.div`
  height: 60vh;
  background-color: white;
  background-image: url("/assets/loginBanner.png");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
`;
const BodySection = styled.div`
  height: 30vh;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
`;
const LoginTextBox = styled(TextBox)`
  margin-top: 5px;
  width: 100%;
`;
const LoginButton = styled(Button)`
  margin-top: 5px;
  width: 100%;
`;
export default (props) => {
  const { router } = useRoute();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <>
      <TopSection></TopSection>
      <BodySection>
        <LoginTextBox
          placeholder="Email"
          value={email}
          style={{ width: "100%" }}
          onChange={(t) => setEmail(t.target.value)}
          type="email"
          name="email"
        />
        <LoginTextBox
          placeholder="Password"
          value={password}
          style={{ width: "100%" }}
          onChange={(t) => setPassword(t.target.value)}
          type="password"
          name="password"
        />

        <LoginButton
          text="เข้าสู่ระบบด้วย JSTPID"
          onClick={() => {
            new Auth()
              .loginWithPassword(email, password)
              .then(() => router.navigate("home"));
          }}></LoginButton>
        <div
          onClick={() => {
            new Auth().registerWithPassword(email, password);
          }}
          style={{ marginTop: 10, textAlign: "center", cursor: "pointer" }}>
          สมัคร JSTPID
        </div>
        {false ? (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              new Auth().signOut();
            }}>
            อ่อกๆจากระบบ JSTPID
          </div>
        ) : (
          <></>
        )}
      </BodySection>
    </>
  );
};
