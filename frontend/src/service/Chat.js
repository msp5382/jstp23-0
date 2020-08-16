import firebase from "firebase";
import "firebase/firestore";
export default class Chat {
  constructor() {
    this.db = firebase.firestore();
    this.userNameCache = [];
    this.timeCache = [];
    this.timeTable = ["M", "R", "D", "B", "V"];
  }
  getUserName = async (uid) => {
    const CacheFound = this.userNameCache.find((user) => user.uid === uid);
    if (CacheFound) {
      return { uid: uid, username: CacheFound.username };
    } else {
      const name = (
        await firebase.firestore().collection("users").doc(uid).get()
      ).data()?.displayName;
      this.userNameCache.push({
        uid: uid,
        username: name,
      });
      return { uid: uid, username: name };
    }
  };
  sendMessage = (id, name, url, m) => {
    const messageFMT = {
      sender: id,
      name: name,
      profilePic: url,
      message: m,
      timestamp: Date.now(),
    };

    this.db.collection("chat").add(messageFMT);
  };
  fetchMessage = () => {};
  listenToMessage = (cb, last) => {
    var query = this.db.collection("chat").orderBy("timestamp", "desc");
    if (last) {
      query = query.startAfter(last).limit(10);
    } else {
      query = query.limit(10);
    }
    query.onSnapshot((q) => {
      var messages = [];
      q.forEach(function (doc) {
        messages.push(doc.data());
      });
      console.log("Callback parameter:");
      const resMsg = messages.map(this.mapMessage);
      Promise.all(resMsg).then((messages) => {
        if (messages !== []) cb(messages, q.docs[q.docs.length - 1]);
        else cb(messages, null);
      });
    });
  };

  mapMessage = async (messenge) => {
    const thisTime = await this.getUserTime(messenge.sender);
    console.log("MAPPING", thisTime);
    return { ...messenge, time: thisTime };
  };
  getUserTime = async (uid) => {
    const TimeFound = this.timeCache.find((u) => u.uid === uid);
    if (TimeFound) {
      return TimeFound.time;
    } else {
      const time = (
        await firebase.firestore().collection("users").doc(uid).get()
      ).data()?.time;
      if (time) {
        this.timeCache.push({
          uid: uid,
          time: time,
        });
        return time;
      } else {
        return null;
      }
    }
  };
}
