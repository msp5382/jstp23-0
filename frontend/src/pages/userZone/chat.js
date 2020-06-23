import React, { useState } from "react";
import { withRoute } from "react-router5";
import Chat from "../../service/Chat";
import Auth from "../../service/Auth";
import UserProfile from "../../service/UserProfile";

import { Navbar, Button } from "../../component";
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
    this.userprofile = new UserProfile().getUser();
    this.name = this.userprofile.displayName;
    this.profilePromise = new UserProfile().getUserProfileImg(this.userprofile.uid).then(async (result)=>{
      this.profileImg= await result;
    });

    
  }

    sendData = () =>{ //ส่งไฟลฺ์แชทเข้า Database
    if(this.state.textMessage!="")
    this.chat.sendMessage(
    this.uData.uid,
    this.name,
    this.profileImg,
    this.state.textMessage
    )
    this.setState({
      textMessage:""
    })
  }
  
    wordPosition = (d) =>{ //จัดแยกซ้ายขวาตาม UID
    if(d.sender == this.uData.uid){
      return <div style={{textAlign:"right"}}>
        <img src={d.profilePic} style={{width:40,borderRadius:100}}/>
        {d.name} : {d.message} 
      </div>
    }
    else{
      return <div>
        <img src={d.profilePic} style={{width:40,borderRadius:100}}/>
        {d.name} : {d.message} 
      </div>
    }
  }

  render() {
    return (
      <>
        <Navbar
          pageName="การตั้งค่า"
          onGoBack={() => this.props.router.navigate("home")}
        />
        <div style={{marginTop:60}}>PAGE :{this.props.router.getState().name}</div>
        <div onClick={() => this.props.router.navigate("home")}>{"<BACK"}</div>
        {this.state.messages.map((d) => (
          <div>
            {this.wordPosition(d)}
            
          </div>
        )).reverse()}
        <form onSubmit={(e)=>{
          e.preventDefault();
          this.sendData()}}>
        <input
          value={this.state.textMessage}
          onChange={(e) => this.setTextMessage(e.target.value)}
          type="text"
        />
          <span onClick={this.sendData} onKeyDownCapture={this.sendData}>Send Message</span>
        </form>
      </>
    );
  }
}
export default withRoute(ChatPage);
