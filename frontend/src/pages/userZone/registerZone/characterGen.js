import React, { useState } from "react";
import { withRoute } from "react-router5";
import styled from "styled-components";
import UserProfile from "../../../service/UserProfile";
import { Navbar, Body, TextBox, Button } from "../../../component";
const PageBody = styled(Body)`
  padding-left: 15px;
  padding-right: 15px;
`;

const ImageUploadButton = styled(Button)``;
const ImageUploadInput = styled.input`
  opacity: 0;
  width: 100%;
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
  }
  render() {
    return (
      <>
        <Navbar pageName="สร้างตัวละคร" />
        <PageBody>
          <div class="row mt-1">
            <div class="col-lg-2 col-md-3 pt-2">ชื่อ:</div>
            <div class="col">
              <TextBox
                className="form-control"
                type="text"
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
          </div>
          <div class="row mt-1">
            <div class="col-lg-2 col-md-3 pt-2">รูปโปรไฟล์:</div>
            <div class="col">
              <ImageUploadButton text="^ อัพโหลดรูปโปรไฟล์">
                <ImageUploadInput type="file" />{" "}
              </ImageUploadButton>
            </div>
          </div>

          <NextButton
            style={{ marginLeft: "auto" }}
            text="ถัดไป >"
            onClick={async () => {
              await this.UserProfile.setUsername(this.state.username);
              this.props.router.navigate("character_edit");
            }}></NextButton>
        </PageBody>
      </>
    );
  }
}
export default withRoute(Page);
