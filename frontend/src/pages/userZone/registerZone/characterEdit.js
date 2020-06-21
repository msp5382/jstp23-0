import React, { useState } from "react";
import { withRoute } from "react-router5";
import UserProfile from "../../../service/UserProfile";
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
        <div>CharacterEdit : {this.state.username}</div>
        <div onClick={() => this.props.router.navigate("character_gen")}>
          * back
        </div>
        <div onClick={() => this.props.router.navigate("home")}>* next</div>
      </>
    );
  }
}
export default withRoute(Page);
