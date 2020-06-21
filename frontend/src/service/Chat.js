import firebase from "firebase";
import "firebase/firestore";
export default class Chat {
  constructor() {
    this.db = firebase.firestore();
  }
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
  listenToMessage = (cb) => {
    this.db
      .collection("chat")
      .orderBy("timestamp", "desc")
      .limit(10)
      .onSnapshot((q) => {
        var messages = [];
        q.forEach(function (doc) {
          messages.push(doc.data());
        });
        console.log(messages);
        cb(messages);
      });
  };
}
