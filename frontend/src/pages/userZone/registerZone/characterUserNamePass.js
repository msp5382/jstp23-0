import React, { useState } from "react";
import { withRoute } from "react-router5";
import styled from "styled-components";
import { registerWithPassword } from "../../../service/Register";
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
    password: "",
    email: "",
  };
  componentDidMount() {}
  render() {
    return (
      <>
        <Navbar pageName="สมัครสมาชิก" />
        <PageBody>
          <div className="row mt-3 pt-3">
            <div className="col-lg-2 col-md-3 pt-2">อีเมลล์</div>
            <div className="col">
              <TextBox
                className="form-control"
                type="email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
          </div>
          <div className="row mt-1 mb-2">
            <div className="col-lg-2 col-md-3 pt-2">รหัสผ่าน</div>
            <div className="col">
              <TextBox
                className="form-control"
                type="password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
          </div>
          <NextButton
            style={{ marginLeft: "auto" }}
            text="ถัดไป >"
            onClick={async () => {
              await registerWithPassword(this.state.email, this.state.password);
              window.location = "/character_gen";
            }}></NextButton>
        </PageBody>
      </>
    );
  }
}
export default withRoute(Page);
