import React, { useState } from "react";
import { withRoute } from "react-router5";
import UserProfile from "../../../service/UserProfile";
import styled from "styled-components";
import { Navbar, Body, TextBox, Button } from "../../../component";
const PageBody = styled(Body)`
  padding-left: 15px;
  padding-right: 15px;
`;

const NextButton = styled(Button)`
  margin-left: auto;
`;
class Page extends React.Component {
  state = {
    username: "",
  };
  componentDidMount() {
    this.UserProfile = new UserProfile();
    this.setState({ username: this.UserProfile?.getUser().displayName });
  }
  render() {
    return (
      <>
        <Navbar
          onGoBack={() => this.props.router.navigate("character_gen")}
          pageName="สร้างตัวละคร"
        />
        <PageBody>
          <NextButton
            style={{ marginLeft: "auto" }}
            text="ถัดไป >"
            onClick={() => this.props.router.navigate("home")}></NextButton>
        </PageBody>
      </>
    );
  }
}
export default withRoute(Page);
