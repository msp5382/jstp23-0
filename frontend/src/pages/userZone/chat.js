import React, { useState, useRef, useEffect, useCallback } from "react";
import { withRoute } from "react-router5";
import Chat from "../../service/Chat";
import Auth from "../../service/Auth";
import UserProfile from "../../service/UserProfile";
import { Navbar, Button, TextBox } from "../../component";
import styled from "styled-components";
import axios from "axios";
const Bubble = styled.div`
  background-color: #fef6e0;
  padding: 5px;
  width: fit-content;
  ${(props) => (props.future ? "color: #c59763;" : "")}
  ${(props) => (props.me ? "align-self: flex-end;" : "")}
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

const Information = styled.div`
  font-size: 0.6rem;
  margin-left: 0.2rem;
  color: #9c6b32;
`;
const ChatBubble = (prop) => {
  return (
    <div>
      <Uname>{prop.name}</Uname>
      <Bubble future={prop.future}>{prop.children}</Bubble>
      {prop.cut ? (
        <Information>ข้อความจากอดีตจะมีการตกหล่นไปตามกาลเวลา</Information>
      ) : (
        <></>
      )}
    </div>
  );
};

/*
1.คนในยุคสุดท้ายจะเห็นทุกข้อความ
2.คนในยุคแรกเห็นการคุยกัน แต่ไม่เห็นข้อความของใครเลย นอกจากยุคเดียวกัน
3.คนในยุคเดียวกัน เห็นข้อความคนยุคเดียวกันปกติ
4.คนในยุคถัดไป ได้ตัวอักษรในข้อความลดลง
5.ยิ่งยุคห่างมาก ก็จะเห็นข้อความลดลงมาก
*/
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
  const userprofile = new UserProfile().getUser();
  const name = userprofile.displayName;
  const [MyTime, SetMyTime] = useState();
  const [wordCutFiltered, setWordCutFiltered] = useState([]);
  let usernameCache = [];
  let chat = new Chat();

  useEffect(() => {
    scroller.current.scrollTop = scroller.current.clientHeight;
    //scroller.current.scrollIntoView({ block: "end" });
  }, [messages]);

  useEffect(() => {
    new UserProfile().getMyTime().then((t) => SetMyTime(t));

    new UserProfile().getUserProfileImg().then((p) => (profileImg = p));
    setLoading(true);
    chat.listenToMessage((data, endDoc) => {
      console.log(data.map((d) => d.sender));
      Promise.all(data.map((d) => chat.getUserName(d.sender))).then(
        (usernameArray) => {
          setUsernameCache((prevCache) =>
            //[...usernameArray, ...UsernameCache].filter((item, pos) => {
            //  return [...usernameArray, ...UsernameCache].indexOf(item) === pos;
            //})
            prevCache.concat(usernameArray)
          );
        }
      );

      setLoading(false);
      setMessages([...messages, ...data]);
      last.current = endDoc;
      if (!endDoc) setHasMore(false);
      scroller.current.scrollTop = scroller.current.clientHeight;
    }, last.current);
  }, [pages]);

  useEffect(() => {
    console.log("UsernameCache2", UsernameCache);
  }, [UsernameCache]);

  const timeFilter = (message) => {
    if (MyTime) {
      const timeMap = {
        M: 0,
        R: 1,
        D: 2,
        B: 3,
        V: 4,
      };

      console.log(
        "message.time",
        message.time,
        "MyTime",
        MyTime,
        timeMap[MyTime],
        timeMap[message.time]
      );

      if (timeMap[MyTime] < timeMap[message.time]) {
        if (props.route.params?.cheat === "on") {
          return {
            ...message,
          };
        } else {
          return {
            ...message,
            message: "ข้อความนี้เกิดขึ้นในอนาคต...",
            future: true,
          };
        }
      } else if (timeMap[MyTime] === timeMap[message.time]) {
        return { ...message };
      } else if (message.time === "ANY") {
        return { ...message };
      } else {
        return { ...message, message: message.message, cut: true };
      }
    } else {
      return message;
    }
  };

  useEffect(() => {
    (async () => {
      const dataWithK = messages.map(timeFilter).map((x, i) => {
        return { pos: i, value: x };
      });
      console.log("messages", {
        cut: dataWithK.map((a) => a.value.message),
      });
      const { data } = await axios.post(
        `https://jstp-admin.msp5382.vercel.app/api/cutword`,
        {
          cut: dataWithK.map((a) => a.value.message),
        }
      );
      const dataWithOutK = dataWithK.map((x) => x.value);
      setWordCutFiltered(
        dataWithOutK.map((x, i) => {
          if (x.cut) {
            if (props.route.params?.cheat === "on") {
              return {
                ...x,
                message: data[i]
                  .split("|")
                  .map((x, i) => (i % 2 === 0 ? x : x))
                  .join(""),
              };
            } else {
              return {
                ...x,
                message: data[i]
                  .split("|")
                  .map((x, i) => (i % 2 === 0 ? "__" : x))
                  .join(""),
              };
            }
          } else {
            return { ...x, messageCut: data[i].split("|") };
          }
        })
      );
    })();
  }, [messages]);

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
            onError={(e) => {
              e.target.src = "/assets/example_user.png";
            }}
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
            future={data.future}
            cut={data.cut}
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
          {wordCutFiltered
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
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                sendData();
              }
            }}
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
