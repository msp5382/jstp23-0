import React, { useState } from "react";
import { withRoute } from "react-router5";
import UserProfile from "../../../service/UserProfile";
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
        <div>CharacterCreate</div>
        <input
          className="form-control"
          type="text"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <div
          onClick={async () => {
            await this.UserProfile.setUsername(this.state.username);
            this.props.router.navigate("character_edit");
          }}>
          * next
        </div>
      </>
    );
  }
}
export default withRoute(Page);
