import React, { useState } from "react";
import { withRoute } from "react-router5";
import Chat from "../../service/Chat";
import Auth from "../../service/Auth";
import UserProfile from "../../service/UserProfile";
import MyCSS from "../../style.css";

import { Navbar, Button } from "../../component";
class ChatPage extends React.Component {
  last = null;
  state = {
    textMessage: "",
    messages: [],
    pages: 0
  };
  setTextMessage = (m) => this.setState({ textMessage: m });
  setMessages = (m) => this.setState({ messages: [...this.state.messages, ...m] });
  setPages = () => this.setState({pages: this.state.pages+1});
  componentDidMount() {
    this.CurrentAuth = new Auth();
    this.uData = this.CurrentAuth.getUserData();
    this.chat = new Chat();
    this.chat.listenToMessage((d,endDoc) => {
      console.log(d);
      this.setMessages(d);
      this.last = endDoc;
    },this.last);
    
    this.userprofile = new UserProfile().getUser();
    this.name = this.userprofile.displayName;
    this.profilePromise = new UserProfile()
      .getUserProfileImg(this.userprofile.uid)
      .then(async (result) => {
        this.profileImg = await result;
      });
  }
  componentDidUpdate(prevProps,prevState){
    if(prevState.pages !== this.state.pages){
      this.chat.listenToMessage((d,endDoc) => {
        console.log(d);
        this.setMessages(d);
        this.last = endDoc;
      },this.last);
  }
  }
  sendData = () => {
    //ส่งไฟลฺ์แชทเข้า Database
    if (this.state.textMessage != "")
      this.chat.sendMessage(
        this.uData.uid,
        this.name,
        this.profileImg,
        this.state.textMessage
      );
    this.setState({
      textMessage: "",
    });
  };

  wordPosition = (d) => {
    //จัดแยกซ้ายขวาตาม UID
    if (d.sender == this.uData.uid) {
      return (
        <div style={{ textAlign: "right" }}>
          
          {d.message} : {d.name}
          <img src={d.profilePic} style={{ width: 40, borderRadius: 100 ,marginBottom:8,marginLeft:5}} />
        </div>
      );
    } else {
      return (
        <div>
          <img src={d.profilePic} style={{ width: 40, borderRadius: 100 ,marginBottom:8,marginRight:5}} />
          {d.name} : {d.message}
        </div>
      );
    }
  };

  render() {
    return (
      <>
        <Navbar
          pageName="แชท"
          onGoBack={() => this.props.router.navigate("home")}
        />
        <div style={{ marginLeft:10,marginRight:10,marginTop: 60 ,marginBottom:60,height : 500, overflowY : "scroll",overflowX : "hidden",scrollbarColor : "red"}}>
          PAGE :{this.props.router.getState().name}
          <a onClick={this.setPages} onKeyDownCapture={this.setPages}>Refresh {this.state.pages}</a>
          <div onClick={() => this.props.router.navigate("home")}>{"<BACK"}</div>
          {this.state.messages
          .map((d) => <div>{this.wordPosition(d)}</div>)
          .reverse()}
        </div>
         <form style = {{textAlign : "center"}}
            onSubmit={(e) => {
            e.preventDefault();
            this.sendData();
          }}>
          <input style = {{marginRight : 8}}
            value={this.state.textMessage}
            onChange={(e) => this.setTextMessage(e.target.value)}
            type="text"
          />
          <span onClick={this.sendData} onKeyDownCapture={this.sendData}>
            Send Message
          </span>
        </form>
        
      </>
    );
  }
}
export default withRoute(ChatPage);
