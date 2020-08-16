import React, { useState, useRef, useEffect, useCallback } from "react";
import { withRoute } from "react-router5";
import Chat from "../../service/Chat";
import Auth from "../../service/Auth";
import UserProfile from "../../service/UserProfile";
import { Navbar, Button, TextBox } from "../../component";
import styled from "styled-components";
const Bubble = styled.div`
  background-color: #fef6e0;
  padding: 5px;
  width: fit-content;
  ${(props) => (props.me ? "align-self: flex-end" : "")}
  height: fit-content;
  border-radius: 7px;
  margin-left: 3px;
`;
const Row = styled.div`
  display: flex;
`;
const Uname = styled.div`
  font-size: 0.6rem;
  margin-left: 0.2rem;
`;
const ChatBubble = (prop) => {
  return (
    <div>
      <Uname>{prop.name}</Uname>
      <Bubble>{prop.children}</Bubble>
    </div>
  );
};
var profileImg = null;
function ChatPage(props) {
  const last = useRef(null);
  const observer = useRef(null);
  const scroller = useRef(null);
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [UsernameCache, setUsernameCache] = useState([]);
  const CurrentAuth = new Auth();
  const uData = CurrentAuth.getUserData();
  const chat = new Chat();
  const userprofile = new UserProfile().getUser();
  const name = userprofile.displayName;
  const profilePromise = new UserProfile()
    .getUserProfileImg(userprofile.uid)
    .then(async (result) => {
      profileImg = await result;
    })
    .catch((err) => {});
  useEffect(() => {
    console.log("Rendering Message");
    scroller.current.scrollTop = scroller.current.clientHeight;
    //scroller.current.scrollIntoView({ block: "end" });
  }, [messages]);

  useEffect(() => {
    setLoading(true);
    chat.listenToMessage((data, endDoc) => {
      console.log(data);
      Promise.all(data.map((d) => new Chat().getUserName(d.sender))).then(
        (usernameArray) => {
          setUsernameCache(
            [...usernameArray, ...UsernameCache].filter((item, pos) => {
              return [...usernameArray, ...UsernameCache].indexOf(item) === pos;
            })
          );
        }
      );

      setLoading(false);
      setMessages([...messages, ...data]);
      last.current = endDoc;
      scroller.current.scrollTop = scroller.current.clientHeight;
      if (!endDoc) setHasMore(false);
    }, last.current);
  }, [pages]);

  const callBackRef = useCallback(
    (element) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (hasMore && entries[0].isIntersecting) {
          setPages(pages + 1);
        }
      });
      if (element) observer.current.observe(element);
    },
    [loading, hasMore]
  );
  const sendData = () => {
    //ส่งไฟลฺ์แชทเข้า Database
    console.log(profileImg);
    if (textMessage !== "")
      chat.sendMessage(uData.uid, name, profileImg, textMessage);
    setTextMessage("");
    //scroller.current.scrollIntoView(false);
  };

  const wordPosition = (data) => {
    //จัดแยกซ้ายขวาตาม UID
    if (data.sender === uData.uid) {
      return (
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
          <ChatBubble>{data.message}</ChatBubble>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", marginTop: 3 }}>
          <img
            alt="profile"
            src={data.profilePic || "/assets/example_user.png"}
            style={{
              width: 40,
              height: 40,
              borderRadius: "100%",
              marginBottom: 8,
              marginLeft: 5,
              marginTop: 12,
            }}
          />
          <ChatBubble
            name={UsernameCache.find((u) => u.uid === data.sender)?.username}>
            {data.message}
          </ChatBubble>
        </div>
      );
    }
  };
  return (
    <>
      <Navbar pageName="แชท" onGoBack={() => props.router.navigate("home")} />
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 60,
          paddingBottom: 30,
          height: "calc( 100vh - 200px)",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarColor: "red",
        }}
        ref={scroller}>
        <div>
          {loading && <p>Loading...</p>}
          {messages
            .map((d, index) => {
              if (index === messages.length - 1)
                return (
                  <div key={index} ref={callBackRef}>
                    {wordPosition(d)}
                  </div>
                );
              return <div key={index}>{wordPosition(d)}</div>;
            })
            .reverse()}
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          bottom: 0,
          marginBottom: 20,
          width: "100%",
        }}>
        <Row>
          <TextBox
            style={{ flex: 1 }}
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            type="text"
          />
          <Button
            style={{ marginLeft: 5 }}
            onClick={sendData}
            text={"Send"}></Button>
        </Row>
      </div>
    </>
  );
}
export default withRoute(ChatPage);
