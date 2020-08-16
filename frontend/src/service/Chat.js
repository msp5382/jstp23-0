import firebase from "firebase";
import "firebase/firestore";
export default class Chat {
  constructor() {
    this.db = firebase.firestore();
    this.userNameCache = [];
  }
  getUserName = async (uid) => {
    const CacheFound = this.userNameCache.find((user) => user.uid === uid);
    if (CacheFound) {
      return { uid: uid, username: CacheFound.username };
    } else {
      const name = (
        await firebase.firestore().collection("users").doc(uid).get()
      ).data().displayName;
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
      if (messages !== []) cb(messages, q.docs[q.docs.length - 1]);
      else cb(messages, null);
    });
  };
}
