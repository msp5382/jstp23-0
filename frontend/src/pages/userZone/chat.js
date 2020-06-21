import React, { useState } from "react";
import { withRoute } from "react-router5";
import Chat from "../../service/Chat";
import Auth from "../../service/Auth";
class ChatPage extends React.Component {
  state = {
    textMessage: "",
    messages: [],
  };
  setTextMessage = (m) => this.setState({ textMessage: m });
  setMessages = (m) => this.setState({ messages: m });

  componentDidMount() {
    this.CurrentAuth = new Auth();
    this.uData = this.CurrentAuth.getUserData();
    this.chat = new Chat();
    this.chat.listenToMessage((d) => {
      console.log(d);
      this.setMessages(d);
    });
  }
  render() {
    return (
      <>
        <div>PAGE :{this.props.router.getState().name}</div>
        <div onClick={() => this.props.router.navigate("home")}>{"<BACK"}</div>
        {this.state.messages.map((d) => (
          <div>
            {d.name}: {d.message}
          </div>
        ))}
        <input
          value={this.state.textMessage}
          onChange={(e) => this.setTextMessage(e.target.value)}
          type="text"
        />
        <div
          onClick={() =>
            this.chat.sendMessage(
              this.uData.uid,
              "meen",
              "",
              this.state.textMessage
            )
          }>
          Send Message
        </div>
        TODO: Connect this to firestore Chat
      </>
    );
  }
}
export default withRoute(ChatPage);
