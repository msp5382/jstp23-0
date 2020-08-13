import React, { useState ,useRef, useEffect, useCallback} from "react";
import { withRoute } from "react-router5";
import Chat from "../../service/Chat";
import Auth from "../../service/Auth";
import UserProfile from "../../service/UserProfile";
import MyCSS from "../../style.css";

import { Navbar, Button } from "../../component";
var profileImg = null;
function ChatPage(props) {
  const last = useRef(null);
  const observer = useRef(null);
  const scroller = useRef(null);
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [pages,setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore,setHasMore] = useState(true);
  const CurrentAuth = new Auth();
  const uData = CurrentAuth.getUserData();
  const chat = new Chat();
  const userprofile = new UserProfile().getUser();
  const name = userprofile.displayName;
  const profilePromise = new UserProfile()
    .getUserProfileImg(userprofile.uid)
    .then(async (result) => {
      profileImg = await result;
  }).catch((err)=>{
    console.log(err);
    console.log("Can't load picture");
  });
  useEffect(()=>{
    console.log("For rendering messages");
    scroller.current.scrollTop = scroller.current.clientHeight;
  },[messages])
  useEffect(() => {
    setLoading(true);
    chat.listenToMessage((data,endDoc) => {
      console.log(data);
      setLoading(false);
      setMessages([...messages,...data]);
      last.current = endDoc;
      if(!endDoc)setHasMore(false);
    },last.current);
  },[pages])

  const callBackRef = useCallback((element)=>{
    console.log("Incallback");
    if(loading) return;
    if(observer.current){
       observer.current.disconnect();
    }
     observer.current = new IntersectionObserver((entries) => {
       if(hasMore && entries[0].isIntersecting){
         setPages(pages+1);
       }
     });
     if(element) observer.current.observe(element);
  },[loading,hasMore]);
  const sendData = () => {
    //ส่งไฟลฺ์แชทเข้า Database
    console.log(profileImg);
    if (textMessage !== "")
      chat.sendMessage(
        uData.uid,
        name,
        profileImg,
        textMessage
      );
    setTextMessage("");
    scroller.current.scrollIntoView({behavior:"smooth"});
  };

  const wordPosition = (data) => {
    //จัดแยกซ้ายขวาตาม UID
    if (data.sender == uData.uid) {
      return (
        <div style={{ textAlign: "right" }}>
          
          {data.message} : {data.name}
          <img src={data.profilePic} style={{ width: 40, borderRadius: 100 ,marginBottom:8,marginLeft:5}} />
        </div>
      );
    } else {
      return (
        <div>
          <img src={data.profilePic} style={{ width: 40, borderRadius: 100 ,marginBottom:8,marginRight:5}} />
          {data.name} : {data.message}
        </div>
      );
    }
  };
    return (<>
        <Navbar
          pageName="แชท"
          onGoBack={() => props.router.navigate("home")}
        />
        <div style={{ marginLeft:10,marginRight:10,marginTop: 60 ,marginBottom:60,height : 500, overflowY : "scroll",overflowX : "hidden",scrollbarColor : "red"}} ref={scroller}>
          PAGE :{props.router.getState().name}
          <div onClick={() => props.router.navigate("home")}>{"<BACK"}</div>
          <div>
          {loading && <p>Loading...</p>}
          {messages
          .map((d,index) => {
            if(index === messages.length-1)
              return <div key={index} ref={callBackRef}>{wordPosition(d)}</div>
          return <div key={index}>{wordPosition(d)}</div>
        })
          .reverse()}
          </div>
        </div>
         <form style = {{textAlign : "center"}}
            onSubmit={(e) => {
            e.preventDefault();
            sendData();
          }}>
          <input style = {{marginRight : 8}}
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            type="text"
          />
          <span onClick={sendData} onKeyDownCapture={sendData}>
            Send Message
          </span>
        </form>
        
      </>
    );
}
export default withRoute(ChatPage);
